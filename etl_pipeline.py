import os
import time
import requests
import pandas as pd
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# 1️⃣ Load environment variables
load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME")
API_KEY = os.getenv("STOCK_API_KEY")

# 2️⃣ SQLAlchemy connection
engine = create_engine(
    f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

# 3️⃣ Stock symbols to track
# symbols = ["TCS:NSE", "INFY:NSE", "WIPRO:NSE", "HCLTECH:NSE", "RELIANCE:NSE", "HDFCBANK:NSE"]
symbols = ["AAPL", "MSFT", "GOOG", "AMZN", "TSLA", "META"]

interval = "1min"  # we’ll fetch 1-min interval updates

# 4️⃣ Function to extract latest stock data
def fetch_latest(symbol):
    url = f"https://api.twelvedata.com/time_series?symbol={symbol}&interval={interval}&outputsize=1&apikey={API_KEY}"
    response = requests.get(url).json()

    if "values" in response:
        data = response["values"][0]
        return {
            "symbol": symbol,
            "price": float(data["close"]),
            "open": float(data["open"]),
            "high": float(data["high"]),
            "low": float(data["low"]),
            "volume": float(data["volume"]),
            "timestamp": data["datetime"]
        }
    else:
        print(f"❌ Error fetching {symbol}: {response}")
        return None

# 5️⃣ Function to load data into RDS
def insert_data(rows):
    if not rows:
        return
    with engine.connect() as conn:
        for row in rows:
            conn.execute(text("""
                INSERT INTO stocks (symbol, price, open, high, low, volume, timestamp)
                VALUES (:symbol, :price, :open, :high, :low, :volume, :timestamp)
            """), row)
        conn.commit()
    print(f"✅ Inserted {len(rows)} records successfully.")

# 6️⃣ The continuous ETL loop
def run_etl():
    print("🚀 Starting ETL pipeline...")
    while True:
        records = []
        for sym in symbols:
            rec = fetch_latest(sym)
            if rec:
                records.append(rec)

        if records:
            insert_data(records)

        print("⏳ Waiting 60 seconds before next ETL cycle...\n")
        time.sleep(60)

# 7️⃣ Run the ETL process
if __name__ == "__main__":
    run_etl()
