import numpy as np
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

class MLEvaluator:
    def __init__(self, model):
        self.model = model

    def evaluate(self, X_test, y_test):
        """
        Evaluate the model using various metrics.
        
        Parameters:
        - X_test: Features of the test set
        - y_test: Ground truth labels of the test set
        
        Returns:
        - metrics: Dictionary containing evaluation metrics
        """
        y_pred = self.model.predict(X_test)
        
        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred, average='weighted')
        recall = recall_score(y_test, y_pred, average='weighted')
        f1 = f1_score(y_test, y_pred, average='weighted')
        
        metrics = {
            'accuracy': accuracy,
            'precision': precision,
            'recall': recall,
            'f1': f1
        }
        
        return metrics

    def predict(self, X):
        """
        Make predictions using the trained model.
        
        Parameters:
        - X: Features of the data to make predictions on
        
        Returns:
        - predictions: Predicted labels
        """
        predictions = self.model.predict(X)
        return predictions
