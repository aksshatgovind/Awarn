import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

class MLUtils:
    def __init__(self, model):
        self.model = model

    def preprocess_data(self, data):
        """
        Preprocess the input data before feeding it to the model.
        
        Parameters:
        - data: Input data as a pandas DataFrame
        
        Returns:
        - X: Features matrix after preprocessing
        """
        # Perform data preprocessing (e.g., feature scaling, handling missing values)
        # Example: scaling numeric features using StandardScaler
        numeric_features = data.select_dtypes(include=[np.number]).columns
        scaler = StandardScaler()
        data[numeric_features] = scaler.fit_transform(data[numeric_features])
        
        # Extract features and target variable from the preprocessed data
        X = data.drop(columns=['target_column'])  # Replace 'target_column' with the actual target column name
        return X

    def train_model(self, X_train, y_train):
        """
        Train the machine learning model using the training data.
        
        Parameters:
        - X_train: Features matrix of the training data
        - y_train: Target variable of the training data
        
        Returns:
        - trained_model: Trained machine learning model
        """
        self.model.fit(X_train, y_train)
        trained_model = self.model
        return trained_model

    def save_model(self, filename):
        """
        Save the trained model to a file.
        
        Parameters:
        - filename: Name of the file to save the model to
        """
        # Serialize and save the trained model using joblib or pickle
        # Example: joblib.dump(self.model, filename)
        pass  # Placeholder for implementation

    @staticmethod
    def load_model(filename):
        """
        Load a trained model from a file.
        
        Parameters:
        - filename: Name of the file containing the saved model
        
        Returns:
        - loaded_model: Loaded machine learning model
        """
        # Load the saved model using joblib or pickle
        # Example: loaded_model = joblib.load(filename)
        pass  # Placeholder for implementation
