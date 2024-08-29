from flask import Flask, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import requests

app = Flask(__name__)
CORS(app)  
model = joblib.load('wisconsin_model.pkl')

def calculate_features(A_GH_ft, A_GHTW_ft, B1_D_SP_inches, df):
    # Calculate rolling mean
    A_GH_ft_Rolling_Mean_3 = df['A_GH_ft'].rolling(window=3).mean().iloc[-1]

    # Calculate lag feature
    A_GH_ft_Lag1 = df['A_GH_ft'].shift(1).iloc[-1]

    # Calculate interaction term
    A_GHTW_ft_B1_D_SP_inches_Interaction = A_GHTW_ft * B1_D_SP_inches

    return A_GH_ft_Rolling_Mean_3, A_GH_ft_Lag1, A_GHTW_ft_B1_D_SP_inches_Interaction

@app.route('/predict', methods=['GET'])
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
        # df = pd.read_csv('app/dataset/Wisconsin_365.csv')  # Update with your actual data path
        # df['Date'] = pd.to_datetime(df['Date'])
        # df['A_GH_ft_Rolling_Mean_3'] = df['A_GH_ft'].rolling(window=3).mean()
        # df['A_GH_ft_Lag1'] = df['A_GH_ft'].shift(1)
        # df = df.dropna()  

        # rolling_mean, lag1, interaction = calculate_features(A_GH_ft, A_GHTW_ft, B1_D_SP_inches, df)

        # # Prepare input DataFrame for prediction
        # input_features = pd.DataFrame([[rolling_mean, lag1, interaction]], columns=['A_GH_ft_Rolling_Mean_3', 'A_GH_ft_Lag1', 'A_GHTW_ft_B1_D_SP_inches_Interaction'])
        


        ## Manual Entry from here


        ## Scrape data for the day
        example_data = {
            'A_GH_ft_Rolling_Mean_3': [7.8],  
            'A_GH_ft_Lag1': [8.2],
            'A_GHTW_ft_B1_D_SP_inches_Interaction': [1.47]
        }

        tdf = pd.DataFrame(example_data)

        # prediction = model.predict(input_features)
        prediction = model.predict(tdf)

        print('Prediction:', prediction[0])
        print('Stop')
        return jsonify({'Flood_Severity': prediction[0]})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
