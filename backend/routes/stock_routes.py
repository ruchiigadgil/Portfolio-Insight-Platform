# backend/routes/stock_routes.py
from flask import Blueprint, jsonify
from sqlalchemy import text
from backend.db import get_db_connection

stock_bp = Blueprint("stock_bp", __name__)

@stock_bp.route("/api/stocks/latest", methods=["GET"])
def get_latest_stocks():
    with get_db_connection() as conn:
        query = text("""
            SELECT symbol, price, open, high, low, volume, timestamp
            FROM stocks
            ORDER BY timestamp DESC
            LIMIT 50;
        """)
        rows = conn.execute(query).mappings().all()
    return jsonify(list(rows))
