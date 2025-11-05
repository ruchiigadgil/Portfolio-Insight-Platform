def compute_portfolio_summary(portfolio):
    total_invested = 0.0
    total_current = 0.0

    for stock in portfolio:
        # Ensure all values are float
        qty = float(stock.get("quantity", 0))
        avg_price = float(stock.get("avg_price", 0))
        price = float(stock.get("price", 0))

        invested = avg_price * qty
        current_value = price * qty
        gain = current_value - invested
        gain_percent = (gain / invested * 100) if invested > 0 else 0

        stock["gain"] = round(gain, 2)
        stock["gain_percent"] = round(gain_percent, 2)

        total_invested += invested
        total_current += current_value

    total_gain = total_current - total_invested
    gain_percent_overall = (total_gain / total_invested * 100) if total_invested > 0 else 0

    summary = {
        "total_invested": round(total_invested, 2),
        "total_current": round(total_current, 2),
        "total_gain": round(total_gain, 2),
        "gain_percent": round(gain_percent_overall, 2)
    }

    return summary, portfolio