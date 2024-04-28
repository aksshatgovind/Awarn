import numpy as np
from sklearn.svm import SVC
# from xgboost import XGBClassifier
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense, Conv2D, Flatten

class SVMModel:
    def __init__(self):
        self.model = SVC()

    def train(self, X_train, y_train):
        """
        Train the SVM model using the training data.
        
        Parameters:
        - X_train: Features matrix of the training data
        - y_train: Target variable of the training data
        """
        self.model.fit(X_train, y_train)

    def evaluate(self, X_test, y_test):
        """
        Evaluate the SVM model using the test data.
        
        Parameters:
        - X_test: Features matrix of the test data
        - y_test: Ground truth labels of the test data
        
        Returns:
        - evaluation_score: Evaluation score (e.g., accuracy, F1-score)
        """
        evaluation_score = self.model.score(X_test, y_test)
        return evaluation_score

    def predict(self, X):
        """
        Make predictions using the trained SVM model.
        
        Parameters:
        - X: Features matrix of the data to make predictions on
        
        Returns:
        - predictions: Predicted labels
        """
        predictions = self.model.predict(X)
        return predictions

'''
class XGBoostModel:
    def __init__(self):
        self.model = XGBClassifier()

    def train(self, X_train, y_train):
        """
        Train the XGBoost model using the training data.
        
        Parameters:
        - X_train: Features matrix of the training data
        - y_train: Target variable of the training data
        """
        self.model.fit(X_train, y_train)

    def evaluate(self, X_test, y_test):
        """
        Evaluate the XGBoost model using the test data.
        
        Parameters:
        - X_test: Features matrix of the test data
        - y_test: Ground truth labels of the test data
        
        Returns:
        - evaluation_score: Evaluation score (e.g., accuracy, F1-score)
        """
        evaluation_score = self.model.score(X_test, y_test)
        return evaluation_score

    def predict(self, X):
        """
        Make predictions using the trained XGBoost model.
        
        Parameters:
        - X: Features matrix of the data to make predictions on
        
        Returns:
        - predictions: Predicted labels
        """
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
        """
        Train the CNN model using the training data.
        
        Parameters:
        - X_train: Features matrix of the training data (images)
        - y_train: Target variable of the training data
        - epochs: Number of training epochs
        """
        self.model.fit(X_train, y_train, epochs=epochs)

    def evaluate(self, X_test, y_test):
        """
        Evaluate the CNN model using the test data.
        
        Parameters:
        - X_test: Features matrix of the test data (images)
        - y_test: Ground truth labels of the test data
        
        Returns:
        - evaluation_score: Evaluation score (e.g., accuracy)
        """
        evaluation_score = self.model.evaluate(X_test, y_test)
        return evaluation_score[1]  # Return accuracy

    def predict(self, X):
        """
        Make predictions using the trained CNN model.
        
        Parameters:
        - X: Features matrix of the data to make predictions on (images)
        
        Returns:
        - predictions: Predicted labels
        """
        predictions = np.argmax(self.model.predict(X), axis=-1)
        return predictions

'''