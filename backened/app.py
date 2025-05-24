from flask import Flask, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import requests

app = Flask(__name__)
CORS(app)  
modelw= joblib.load('app/wisconsin_model.pkl')
modelny = joblib.load('app/ny_model.pkl')

def calculate_features(A_GH_ft, A_GHTW_ft, B1_D_SP_inches, df):
    # Calculate rolling mean
    A_GH_ft_Rolling_Mean_3 = df['A_GH_ft'].rolling(window=3).mean().iloc[-1]
    A_GH_ft_Rolling_Mean_3 = (A_GH_ft_Rolling_Mean_3+A_GH_ft)/2

    # Calculate lag feature
    A_GH_ft_Lag1 = df['A_GH_ft'].shift(1).iloc[-1]

    # Calculate interaction term
    A_GHTW_ft_B1_D_SP_inches_Interaction = A_GHTW_ft * B1_D_SP_inches

    return A_GH_ft_Rolling_Mean_3, A_GH_ft_Lag1, A_GHTW_ft_B1_D_SP_inches_Interaction
@app.route('/Newyork', methods=['GET'])
def ny():
    try:
        print('Start')
        df = pd.read_csv('app/dataset/NewYork_365.csv') 
        df = df.dropna()  

        # 'Gage,height,feet,(Mean)WIND_LAKE(WI)': 'A_GH_ft',
        # 'Gage,height,feet,TAILWATER(Mean)WIND_LAKE(WI)': 'A_GHTW_ft',
        # 'Daily Sum Precipitation, total, inches(AREA-1)WATERFORD(WI)': 'B1_D-SP_inches',

        # 2 Nov 2024
        # example_data = pd.DataFrame({
        #     'H_MinT_degC': [17.9],  
        #     'C3_MaxT_degC': [24.3],
        #     'H_MeanT_degC': [21.2]
        # })

        # 19 Feb 2025
        example_data = pd.DataFrame({
            'H_MinT_degC': [0.5],  
            'C3_MaxT_degC': [0.5],
            'H_MeanT_degC': [0.5]
        })
        H_MinT = example_data['H_MinT_degC']
        C3_MaxT = example_data['C3_MaxT_degC']
        H_MeanT = example_data['H_MeanT_degC']
        print(H_MinT,C3_MaxT,H_MeanT)

        # Prepare input DataFrame for prediction
        input_features = pd.DataFrame([[H_MinT,C3_MaxT,H_MeanT]], columns=['H_MinT_degC', 'C3_MaxT_degC', 'H_MeanT_degC'])

        prediction = modelny.predict(input_features)

        print('Prediction:',prediction[0])
        print('Stop')

        # return jsonify({'Flood_Severity': prediction[0]})
        region_details = {
            'name': 'New York',
            'latitude': 44.583712,
            'longitude': -89.663033,
            'description': 'Flood risk assessment for New York region',
            'Flood_Severity': prediction[0]
        }

        return jsonify(region_details)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/wisconsin', methods=['GET'])
def predict():
    try:
        print('Start')
        # response = requests.get('URL_OF_THE_DATA_SOURCE') # USGS API which we dont have
        # data = response.json()

        # A_GH_ft = data['A_GH_ft']
        # A_GHTW_ft = data['A_GHTW_ft']
        # B1_D_SP_inches = data['B1_D_SP_inches']

        # # Fetch existing DataFrame for feature calculation
        df = pd.read_csv('app/dataset/Wisconsin_365.csv')  # Update with your actual data path
        df['Date'] = pd.to_datetime(df['Date'])
        df['A_GH_ft_Rolling_Mean_3'] = df['A_GH_ft'].rolling(window=3).mean()
        df['A_GH_ft_Lag1'] = df['A_GH_ft'].shift(1)
        df = df.dropna()  

        # rolling_mean, lag1, interaction = calculate_features(A_GH_ft, A_GHTW_ft, B1_D_SP_inches, df)

        # # Prepare input DataFrame for prediction
        # input_features = pd.DataFrame([[rolling_mean, lag1, interaction]], columns=['A_GH_ft_Rolling_Mean_3', 'A_GH_ft_Lag1', 'A_GHTW_ft_B1_D_SP_inches_Interaction'])

        # 'Gage,height,feet,(Mean)WIND_LAKE(WI)': 'A_GH_ft',
        # 'Gage,height,feet,TAILWATER(Mean)WIND_LAKE(WI)': 'A_GHTW_ft',
        # 'Daily Sum Precipitation, total, inches(AREA-1)WATERFORD(WI)': 'B1_D-SP_inches',


        # 2 Nov 2024
        # example_data = pd.DataFrame({
        #     'A_GH_ft': [2.51],  
        #     'A_GHTW_ft': [45.8],
        #     'B1_D_SP_inches': [0.01]
        # })

        # 19 Feb 2025
        example_data = pd.DataFrame({
            'A_GH_ft': [2.76],  
            'A_GHTW_ft': [2.80],
            'B1_D_SP_inches': [0.01]
        })
        A_GH_ft = example_data['A_GH_ft']
        A_GHTW_ft = example_data['A_GHTW_ft']
        B1_D_SP_inches = example_data['B1_D_SP_inches']
        print(A_GH_ft,A_GHTW_ft,B1_D_SP_inches)

        rolling_mean, lag1, interaction = calculate_features(A_GH_ft, A_GHTW_ft, B1_D_SP_inches, df)
        print(rolling_mean, lag1, interaction)

        # Prepare input DataFrame for prediction
        input_features = pd.DataFrame([[rolling_mean, lag1, interaction]], columns=['A_GH_ft_Rolling_Mean_3', 'A_GH_ft_Lag1', 'A_GHTW_ft_B1_D_SP_inches_Interaction'])

        prediction = modelw.predict(input_features)

        print('Prediction:',prediction[0])
        print('Stop')
        # return jsonify({'Flood_Severity': prediction[0]})
        region_details = {
            'name': 'Wisconsin',
            'latitude': 44.522910,
            'longitude': -89.589784,
            'description': 'Flood risk assessment for Wisconsin region',
            'Flood_Severity': prediction[0]
        }

        return jsonify(region_details)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    


if __name__ == '__main__':
    app.run(debug=True)
