
from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "project": "DisasterSafe AI",
        "message": "Backend API is running successfully!",
        "status": "online"
    })


@app.route("/api/health")
def health():
    return jsonify({
        "status": "healthy",
        "project": "DisasterSafe AI",
        "timestamp": datetime.now().isoformat()
    })


@app.route("/api/risk")
def risk():
    return jsonify({
        "success": True,
        "locations": [
            {
                "name": "Darjeeling",
                "flood_risk": 42,
                "landslide_risk": 82,
                "rainfall_mm": 118,
                "risk_level": "HIGH"
            },
            {
                "name": "Malda",
                "flood_risk": 67,
                "landslide_risk": 34,
                "rainfall_mm": 74,
                "risk_level": "MODERATE"
            },
            {
                "name": "Kolkata",
                "flood_risk": 32,
                "landslide_risk": 12,
                "rainfall_mm": 45,
                "risk_level": "LOW"
            }
        ]
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
