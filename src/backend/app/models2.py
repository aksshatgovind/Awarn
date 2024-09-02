from flask import Flask, jsonify
import joblib
import pandas as pd
import numpy as np
import requests

app = Flask(__name__)

model = joblib.load('app/ny_model.pkl')

@app.route('/predict', methods=['GET'])
def predict():
    try:
        print('Start')
        df = pd.read_csv('app/dataset/NewYork_365.csv')  # Update with your actual data path
        df = df.dropna()  
    
        ## Manual Entry from here

        # 'Gage,height,feet,(Mean)WIND_LAKE(WI)': 'A_GH_ft',
        # 'Gage,height,feet,TAILWATER(Mean)WIND_LAKE(WI)': 'A_GHTW_ft',
        # 'Daily Sum Precipitation, total, inches(AREA-1)WATERFORD(WI)': 'B1_D-SP_inches',


        ## Scrape data for the day
        example_data = pd.DataFrame({
            'H_MinT_degC': [8.5],  
            'C3_MaxT_degC': [10],
            'H_MeanT_degC': [10.8]
        })
        H_MinT = example_data['H_MinT_degC']
        C3_MaxT = example_data['C3_MaxT_degC']
        H_MeanT = example_data['H_MeanT_degC']
        print(H_MinT,C3_MaxT,H_MeanT)

        # Prepare input DataFrame for prediction
        input_features = pd.DataFrame([[H_MinT,C3_MaxT,H_MeanT]], columns=['H_MinT_degC', 'C3_MaxT_degC', 'H_MeanT_degC'])

        prediction = model.predict(input_features)

        print('Prediction:',prediction[0])
        print('Stop')
        return jsonify({'Flood_Severity': prediction[0]})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
