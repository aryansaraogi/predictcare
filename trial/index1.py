from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import os
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In a real application, you would load your trained models here
# For demonstration, we'll create mock prediction functions

def predict_chd(data):
    # Mock prediction function for CHD with updated fields
    risk_factors = 0
    
    # Age factor
    if data.get('age', 0) > 50:
        risk_factors += 1
    
    # Gender factor (male has higher risk)
    if data.get('male') == '1':
        risk_factors += 1
    
    # Education level (lower education might correlate with higher risk)
    if data.get('education') == '1':
        risk_factors += 0.5
    
    # Smoking factors
    if data.get('currentSmoker') == '1':
        risk_factors += 1
        # Heavy smoker
        if data.get('cigsPerDay', 0) > 10:
            risk_factors += 0.5
    
    # Medical history factors
    if data.get('bpMeds') == '1':
        risk_factors += 0.5
    if data.get('prevalentStroke') == '1':
        risk_factors += 1.5
    if data.get('prevalentHyp') == '1':
        risk_factors += 1
    if data.get('diabetes') == '1':
        risk_factors += 1.5
    
    # Cholesterol
    if data.get('totChol', 0) > 240:
        risk_factors += 1
    
    # Blood pressure
    if data.get('sysBP', 0) > 140 or data.get('diaBP', 0) > 90:
        risk_factors += 1
    
    # BMI
    if data.get('bmi', 0) > 30:
        risk_factors += 0.5
    
    # Heart rate
    if data.get('heartRate', 0) > 100 or data.get('heartRate', 0) < 60:
        risk_factors += 0.5
    
    # Glucose
    if data.get('glucose', 0) > 126:
        risk_factors += 1
    
    # Calculate probability (simplified)
    max_factors = 11.5  # Maximum possible risk factors
    probability = min(0.9, risk_factors / max_factors)
    
    return {
        'probability': probability,
        'risk': 'High' if probability > 0.7 else 'Moderate' if probability > 0.3 else 'Low'
    }

def predict_stroke(data):
    # Mock prediction function for stroke with updated fields
    risk_factors = 0
    
    # Age factor
    if data.get('age', 0) > 60:
        risk_factors += 1.5
    elif data.get('age', 0) > 45:
        risk_factors += 0.8
    
    # Hypertension
    if data.get('hypertension') == '1':
        risk_factors += 1.5
    
    # Heart disease
    if data.get('heart_disease') == '1':
        risk_factors += 1.5
    
    # Glucose level
    glucose = float(data.get('avg_glucose_level', 100))
    if glucose > 140:
        risk_factors += 1
    elif glucose > 120:
        risk_factors += 0.5
    
    # BMI
    bmi = float(data.get('bmi', 25))
    if bmi > 30:
        risk_factors += 0.8
    elif bmi > 25:
        risk_factors += 0.4
    
    # Gender
    if data.get('gender') == 'Male':
        risk_factors += 0.3
    
    # Residence type
    if data.get('residence_type') == 'Urban':
        risk_factors += 0.1  # Slight increase for urban areas
    
    # Smoking status
    if data.get('smoking_status') == 'smokes':
        risk_factors += 1
    elif data.get('smoking_status') == 'formerly_smoked':
        risk_factors += 0.5
    
    # Calculate probability (simplified)
    max_factors = 7.7  # Maximum possible risk factors
    probability = min(0.9, risk_factors / max_factors)
    
    return {
        'probability': probability,
        'risk': 'High' if probability > 0.7 else 'Moderate' if probability > 0.3 else 'Low'
    }


def predict_diabetes(data):
    risk_factors = 0

    # Age factor
    if data.get('age', 0) > 45:
        risk_factors += 0.8

    # Gender factor
    if data.get('gender') == '1':  # Male
        risk_factors += 0.2

    # BMI
    bmi = float(data.get('bmi', 25))
    if bmi > 30:
        risk_factors += 1
    elif bmi > 25:
        risk_factors += 0.5

    # Blood pressure
    if int(data.get('sbp', 120)) > 140 or int(data.get('dbp', 80)) > 90:
        risk_factors += 0.8

    # Glucose levels
    fpg = float(data.get('fpg', 100))
    if fpg > 126:
        risk_factors += 1.5
    elif fpg > 100:
        risk_factors += 0.7

    # Cholesterol factors
    if int(data.get('chol', 200)) > 240:
        risk_factors += 0.5
    if int(data.get('hdl', 50)) < 40:
        risk_factors += 0.5
    if int(data.get('ldl', 130)) > 160:
        risk_factors += 0.5

    # Kidney function
    if int(data.get('bun', 15)) > 20:
        risk_factors += 0.3
    if int(data.get('ccr', 90)) < 60:
        risk_factors += 0.4

    # Fasting glucose
    if float(data.get('ffpg', 95)) > 100:
        risk_factors += 0.7

    # Lifestyle factors
    if data.get('smoking_status') == '1':
        risk_factors += 0.4
    if data.get('drinking_status') == '1':
        risk_factors += 0.3

    # Family history
    if data.get('family_history') == '1':
        risk_factors += 1.5

    # Final probability
    max_factors = 10.4
    probability = min(0.9, risk_factors / max_factors)

    return {
        'probability': probability,
        'risk': 'High' if probability > 0.7 else 'Moderate' if probability > 0.3 else 'Low'
    }


@app.route('/api/predict/chd', methods=['POST'])
def chd_prediction():
    data = request.json
    result = predict_chd(data)
    return jsonify(result)

@app.route('/api/predict/stroke', methods=['POST'])
def stroke_prediction():
    data = request.json
    result = predict_stroke(data)
    return jsonify(result)

@app.route('/api/predict/diabetes', methods=['POST'])
def diabetes_prediction():
    data = request.json
    result = predict_diabetes(data)
    return jsonify(result)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "PredictCare API is running"})

@app.route('/')
def index():
    return jsonify({"message": "wlecome to "})

if __name__ == '__main__':
    # For local development
    app.run(host='127.0.0.1', port=5328, debug=True)

