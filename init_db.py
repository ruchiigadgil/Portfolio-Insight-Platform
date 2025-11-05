from sqlalchemy import create_engine, text
import mysql.connector
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Read database credentials
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME")

# Step 1: Ensure the database exists
try:
    conn = mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT
    )
    cursor = conn.cursor()
    cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME};")
    print(f"✅ Database '{DB_NAME}' created or already exists.")
    cursor.close()
    conn.close()
except Exception as e:
    print("❌ Error while creating database:", e)
    exit(1)

# Step 2: Connect to the database using SQLAlchemy
connection_string = f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
engine = create_engine(connection_string)

# Step 3: Create tables
sql_commands = [
    """
    CREATE TABLE IF NOT EXISTS stocks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      symbol VARCHAR(20),
      price DOUBLE,
      open DOUBLE,
      high DOUBLE,
      low DOUBLE,
      volume DOUBLE,
      timestamp DATETIME
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS portfolios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_name VARCHAR(100),
      symbol VARCHAR(20),
      quantity INT,
      avg_price DOUBLE
    );
    """
]

try:
    with engine.connect() as conn:
        for command in sql_commands:
            conn.execute(text(command))
        print("✅ Tables created successfully in database!")
except Exception as e:
    print("❌ Error while creating tables:", e)
