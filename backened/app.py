from flask import Flask, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import requests

app = Flask(__name__)
CORS(app)  
modelw= joblib.load('wisconsin_model.pkl')
modelny = joblib.load('ny_model.pkl')

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
        df = pd.read_csv('NewYork_365.csv')  # Update with your actual data path
        df = df.dropna()  
    
        ## Manual Entry from here

        # 'Gage,height,feet,(Mean)WIND_LAKE(WI)': 'A_GH_ft',
        # 'Gage,height,feet,TAILWATER(Mean)WIND_LAKE(WI)': 'A_GHTW_ft',
        # 'Daily Sum Precipitation, total, inches(AREA-1)WATERFORD(WI)': 'B1_D-SP_inches',


        ## Scrape data for the day
        example_data = pd.DataFrame({
            'H_MinT_degC': [11.7],  
            'C3_MaxT_degC': [18.7],
            'H_MeanT_degC': [10.8]
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
        return jsonify({'Flood_Severity': prediction[0]})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/wisconsin', methods=['GET'])
def predict():
    try:
        print('Start')
        # Fetch real-time data from another source
        # response = requests.get('URL_OF_THE_DATA_SOURCE') # USGS API which we dont have
        # data = response.json()

        # A_GH_ft = data['A_GH_ft']
        # A_GHTW_ft = data['A_GHTW_ft']
        # B1_D_SP_inches = data['B1_D_SP_inches']

        # # Fetch existing DataFrame for feature calculation
        df = pd.read_csv('Wisconsin_365.csv')  # Update with your actual data path
        df['Date'] = pd.to_datetime(df['Date'])
        df['A_GH_ft_Rolling_Mean_3'] = df['A_GH_ft'].rolling(window=3).mean()
        df['A_GH_ft_Lag1'] = df['A_GH_ft'].shift(1)
        df = df.dropna()  

        # rolling_mean, lag1, interaction = calculate_features(A_GH_ft, A_GHTW_ft, B1_D_SP_inches, df)

        # # Prepare input DataFrame for prediction
        # input_features = pd.DataFrame([[rolling_mean, lag1, interaction]], columns=['A_GH_ft_Rolling_Mean_3', 'A_GH_ft_Lag1', 'A_GHTW_ft_B1_D_SP_inches_Interaction'])
        


        ## Manual Entry from here

        # 'Gage,height,feet,(Mean)WIND_LAKE(WI)': 'A_GH_ft',
        # 'Gage,height,feet,TAILWATER(Mean)WIND_LAKE(WI)': 'A_GHTW_ft',
        # 'Daily Sum Precipitation, total, inches(AREA-1)WATERFORD(WI)': 'B1_D-SP_inches',


        ## Scrape data for the day
        example_data = pd.DataFrame({
            'A_GH_ft': [11.7],  
            'A_GHTW_ft': [8.7],
            'B1_D_SP_inches': [0.8]
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
        return jsonify({'Flood_Severity': prediction[0]})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    


    


if __name__ == '__main__':
    app.run(debug=True)