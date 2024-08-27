from src.ml_models.final import load_river_data
import json
import joblib
from datetime import datetime
import numpy as np
from sklearn.preprocessing import Normalizer
from app.utils.utils import MLUtils

with open('/Users/coding/Documents/vs/Awarn/app/dataset/Flood/Tributary/Tri.json', 'r') as file:
    tributary_data = json.load(file)

with open('/Users/coding/Documents/vs/Awarn/src/ml_models/tributary_class.json', 'r') as file:
    tri_data = json.load(file)

# rivD = {'Cauvery': ['Amaravati',  'Arkavathy', 'Bhavani', 'Chinnar', 'Hemavati', 'Honnuhole', 'Kabini', 'Kannika', 'Kollidam', 'Lakshmana Tirtha', 'Lokapavani', 'Noyyal', 'Pambar',  'Shimsha', 'Sujyothi'],
# 'Godavari': ['Pravara','Mula','Manjra','Peddavagu','Maner','Wainganga','Wardha','Kadva','Penganga','Purna','Kadam','Pranahita','Indravati'],
# 'Krishna': ['Ghataprabha','Malaprabha','Bhima','Tungabhadra','Musi'],
# 'Mahanadi': ['Seonath', 'Jonk', 'Hasdeo', 'Mand', 'Ib', 'Ong', 'Tel'],
# 'Son': ['Johilla', 'Mahanadi', 'Banas', 'Gopad', 'Rihand', 'Ghagher' , 'Kanhar','North Koel']}

nl = Normalizer()

def predict_flood_for_tributaries(tributaries_data):
    model = joblib.load('/Users/coding/Documents/vs/Awarn/src/ml_models/sLDA.pkl')
    predictions = {}
    for tributary, data in tributaries_data.items():
        lengths = set(len(x) for x in data)
        if len(lengths) > 1:
            max_length = max(lengths)
            x_test_padded = [x + [0] * (max_length - len(x)) for x in data]
            data = np.array(x_test_padded)
        else:
            data = np.array(data)

        tributary_data = nl.transform(data) 
        predicted_class = model.predict(tributary_data)[3]
        predictions[tributary] = predicted_class
    return predictions


result = predict_flood_for_tributaries(tributary_data)

coord = {}
for region_name, value in tri_data.items():
    coordinates = MLUtils.geocode_region(str(region_name))
    if coordinates:
        coord[coordinates] = value
    else:
        coord[(-1,-1)] = value
print(coord)

# serializable_coord = {str(k): v for k, v in coord.items()}
# json_data = json.dumps(serializable_coord)

# with open('loc_data.json', 'w') as json_file:
#     json_file.write(json_data)