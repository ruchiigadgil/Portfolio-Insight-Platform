from flask import Flask
from flask_cors import CORS
from backend.routes.portfolio_routes import portfolio_bp
from backend.routes.stock_routes import stock_bp

app = Flask(__name__)

# Enable dynamic CORS for all origins and routes
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Register blueprints with API prefix
app.register_blueprint(portfolio_bp, url_prefix="/api")
app.register_blueprint(stock_bp, url_prefix="/api")

@app.route("/")
def home():
    return {"message": "Portfolio Tracker API is running!"}

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
