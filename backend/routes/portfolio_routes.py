from flask import Blueprint, jsonify, request
from sqlalchemy import text
from backend.db import get_db_connection
from backend.utils.calculations import compute_portfolio_summary
from flask_cors import cross_origin
import decimal  # ← Needed for Decimal → float conversion

portfolio_bp = Blueprint("portfolio_bp", __name__)

# ===================================================================
# ✅ ADD PORTFOLIO ENTRY (INSERT)
# ===================================================================
@portfolio_bp.route("/add-portfolio", methods=["POST"])
@cross_origin()
def add_portfolio_entry():
    data = request.json
    required = ["user_name", "symbol", "quantity", "avg_price"]

    if not all(k in data for k in required):
        return jsonify({"error": "Missing required fields"}), 400

    # Force numeric types
    try:
        data["quantity"] = float(data["quantity"])
        data["avg_price"] = float(data["avg_price"])
    except (ValueError, TypeError):
        return jsonify({"error": "quantity and avg_price must be numbers"}), 400

    with get_db_connection() as conn:
        conn.execute(
            text("""
                INSERT INTO portfolios (user_name, symbol, quantity, avg_price)
                VALUES (:user_name, :symbol, :quantity, :avg_price)
            """),
            data
        )
        conn.commit()

    return jsonify({"message": "Portfolio entry added successfully"}), 201


# ===================================================================
# 📊 FETCH USER PORTFOLIO (WITH GROUP BY → NO DUPLICATES)
# ===================================================================
@portfolio_bp.route("/portfolio/<user_name>", methods=["GET"])
@cross_origin()
def get_user_portfolio(user_name):
    try:
        with get_db_connection() as conn:
            query = text("""
                SELECT 
                    p.symbol,
                    p.quantity,
                    p.avg_price,
                    COALESCE(s.price, 0) AS price,
                    MAX(s.timestamp) AS updated
                FROM portfolios p
                LEFT JOIN stocks s ON p.symbol = s.symbol
                WHERE p.user_name = :user_name
                GROUP BY p.symbol, p.quantity, p.avg_price
                ORDER BY p.symbol;
            """)
            rows = conn.execute(query, {"user_name": user_name}).mappings().all()

        if not rows:
            return jsonify({"error": "No portfolio found for this user"}), 404

        # Convert MySQL Decimal → Python float
        portfolio_data = []
        for row in rows:
            clean = {}
            for k, v in row.items():
                clean[k] = float(v) if isinstance(v, decimal.Decimal) else v
            portfolio_data.append(clean)

        summary, portfolio_with_gains = compute_portfolio_summary(portfolio_data)

        return jsonify({
            "user_name": user_name,
            "summary": summary,
            "portfolio": portfolio_with_gains
        })

    except Exception as e:
        print("Error in get_user_portfolio:", e)
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Internal server error", "details": str(e)}), 500