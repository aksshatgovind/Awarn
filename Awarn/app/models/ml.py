import numpy as np
from sklearn.svm import SVC
from xgboost import XGBClassifier
from keras.models import Sequential
from keras.layers import Dense, Conv2D, Flatten
import pandas as pd
from sklearn.utils import shuffle
from sklearn.metrics import mean_absolute_error, classification_report
from sklearn.linear_model import LogisticRegression
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.neighbors import KNeighborsClassifier

import warnings
warnings.filterwarnings("ignore")

class PreProcess:
    def __init__(self, filename):
        self.filename = filename
    
    def read_data(self):
        data = pd.read_excel('/Users/coding/Documents/vs/Awarn/app/dataset/Flood/' + self.filename + '.xlsx')
        return data
    
    def fill_null_entries(self, data):
        for i in range(1, len(data.columns)):
            data[data.columns[i]] = data[data.columns[i]].fillna(data[data.columns[i]].mean())
        return data
    
    def preprocess_dates(self, data):
        d1 = pd.DataFrame()
        d1["Day"] = data['Date']
        d1['Months'] = data['Date']
        d1['Year'] = data['Date']
        data['Date'] = pd.to_datetime(data['Date'])
        d1["Year"] = data.Date.dt.year
        d1["Months"] = data.Date.dt.month
        d1["Day"] = data.Date.dt.day
        data.drop('Date', inplace=True, axis=1)
        return data, d1

class LinReg:
    def __init__(self):
        self.model = LogisticRegression()

    def fit(self, x_train, y_train):
        self.model.fit(x_train, y_train)

    def predict(self, x_test):
        return self.model.predict(x_test)

    def score(self, x_test, y_test):
        return self.model.score(x_test, y_test)

    def classification_report(self, x_test, y_test):
        return classification_report(y_test, self.model.predict(x_test))
    
    def classify_flood_risk(self, probability_score):
        if probability_score < 0.3:
            return "Low"
        elif 0.3 <= probability_score < 0.7:
            return "Moderate"
        else:
            return "High"

class LDA:
    def __init__(self):
        self.model = LinearDiscriminantAnalysis(solver='svd', shrinkage=None)

    def fit(self, x_train, y_train):
        self.model.fit(x_train, y_train)

    def predict(self, x_test):
        return self.model.predict(x_test)

    def score(self, x_test, y_test):
        return self.model.score(x_test, y_test)

    def classification_report(self, x_test, y_test):
        return classification_report(y_test, self.model.predict(x_test))
    
    def classify_flood_risk(self, decision_score):
        if decision_score < 0:
            return "Low"
        elif 0 <= decision_score < 1:
            return "Moderate"
        else:
            return "High"

    def get_params(self, deep=True):
        return self.model.get_params(deep)

    def set_params(self, **params):
        self.model.set_params(**params)
        return self

class KNN:
    def __init__(self):
        self.model = KNeighborsClassifier()

    def fit(self, x_train, y_train):
        self.model.fit(x_train, y_train)

    def predict(self, x_test):
        return self.model.predict(x_test)

    def score(self, x_test, y_test):
        return self.model.score(x_test, y_test)

    def classification_report(self, x_test, y_test):
        return classification_report(y_test, self.model.predict(x_test))

    def classify_flood_risk(self, distance_score):
        if distance_score < 0.3:
            return "Low"
        elif 0.3 <= distance_score < 0.7:
            return "Moderate"
        else:
            return "High"

class SVMModel:
    def __init__(self):
        self.model = SVC()

    def fit(self, X_train, y_train):
        self.model.fit(X_train, y_train)

    def evaluate(self, X_test, y_test):
        evaluation_score = self.model.score(X_test, y_test)
        return evaluation_score

    def predict(self, X):
        predictions = self.model.predict(X)
        return predictions

class XGBoostModel:
    def __init__(self):
        self.model = XGBClassifier()

    def fit(self, X_train, y_train):
        self.model.fit(X_train, y_train)

    def evaluate(self, X_test, y_test):
        evaluation_score = self.model.score(X_test, y_test)
        return evaluation_score

    def predict(self, X):
        predictions = self.model.predict(X)
        return predictions


class CNNModel:
    def __init__(self):
        self.model = Sequential([
            Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)),
            Flatten(),
            Dense(10, activation='softmax')
        ])
        self.model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    def train(self, X_train, y_train, epochs=10):
        self.model.fit(X_train, y_train, epochs=epochs)

    def evaluate(self, X_test, y_test):
        evaluation_score = self.model.evaluate(X_test, y_test)
        return evaluation_score[1]

    def predict(self, X):
        predictions = np.argmax(self.model.predict(X), axis=-1)
        return predictions

