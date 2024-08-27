import numpy as np
import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler
import requests

class MLUtils:
    def __init__(self):
        # self.model = model
        pass

    def preprocess_data(self, filename):
        data=pd.read_excel('/Users/coding/Documents/vs/Awarn/app/dataset/Flood/'+filename+'.xlsx')

        y=data['Flood']
        for i in range(len(y)):
            if(y[i] >= 0.1):
                y[i]=1
        y=pd.DataFrame(y)

        numeric_features = data.select_dtypes(include=[np.number]).columns
        scaler = StandardScaler()
        data[numeric_features] = scaler.fit_transform(data[numeric_features])
        
        X = data.drop(columns=['Flood'])
        return X 

    def save_model(self, filename):
        joblib.dump(self.model, filename)


    def geocode_region(region_name):
        url = f"https://nominatim.openstreetmap.org/search?format=json&q={region_name}"

        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            if data:
                lat = data[0]['lat']
                lon = data[0]['lon']
                return float(lat), float(lon)
            else:
                # print(f"No results found for '{region_name}'")
                return None
        else:
            print(f"Error: {response.status_code} - {response.reason}")
            return None

    @staticmethod
    def load_model(filename):
        loaded_model = joblib.load(filename)
        return loaded_model

Cau_river = pd.read_excel('/Users/coding/Documents/vs/Awarn/app/dataset/Flood/Cauvery.xlsx')
PrePro = MLUtils()
# print(PrePro.preprocess_data(Cau_river))

latitude, longitude = MLUtils.geocode_region([0])
# if latitude is not None and longitude is not None:
    # print(f"Coordinates for {[0]}: Latitude={latitude}, Longitude={longitude}")
