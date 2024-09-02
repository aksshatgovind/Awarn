# Flood Prediction Model Report: Wisconsin Data

## Introduction

This report outlines the development and results of a flood prediction model based on the Wisconsin 365 dataset. The model predicts flood severity over a 365-day period using various engineered features from historical data. The key features include rolling means, lagged values, and interaction terms.

## Dataset Overview

The dataset `Wisconsin_365.csv` contains various measurements related to water levels, including the following key columns:
- **Date**: The date of the measurement.
- **A_GH_ft**: Gage height in feet.
- **A_GHTW_ft**: Gage height to the west in feet.
- **A1_D-SP_inches**: Distance measurement in inches.
- **B1_D-SP_inches**: Another distance measurement in inches.
- **C_D-MGH_ft**: Another gage height measurement.

## Feature Engineering

### Date Features
- **Year, Month, Day**: Extracted from the Date column.
- **Weekday**: The day of the week (Monday=0, Sunday=6).
- **Hour, Minute**: Extracted from the Date column.
- **Is_Weekend**: Binary feature indicating if the day is a weekend.
- **Is_Holiday**: Binary feature indicating if the day is a holiday (predefined list).

### Lag Features
- **A_GH_ft_Lag1**: Lagged value of `A_GH_ft`.
- **A_GHTW_ft_Lag1**: Lagged value of `A_GHTW_ft`.
- **A1_D_SP_inches_Lag1**: Lagged value of `A1_D-SP_inches`.
- **B1_D_SP_inches_Lag1**: Lagged value of `B1_D-SP_inches`.
- **C_D_MGH_ft_Lag1**: Lagged value of `C_D-MGH_ft`.

### Rolling Statistics
- **A_GH_ft_Rolling_Mean_3**: 3-day rolling mean of `A_GH_ft`.
- **A_GH_ft_Rolling_Std_3**: 3-day rolling standard deviation of `A_GH_ft`.
- **A_GHTW_ft_Rolling_Mean_3**: 3-day rolling mean of `A_GHTW_ft`.
- **A_GHTW_ft_Rolling_Std_3**: 3-day rolling standard deviation of `A_GHTW_ft`.

### Interaction Features
- **A_GH_ft_A1_D_SP_inches_Interaction**: Interaction between `A_GH_ft` and `A1_D-SP_inches`.
- **A_GHTW_ft_B1_D_SP_inches_Interaction**: Interaction between `A_GHTW_ft` and `B1_D-SP_inches`.

### Data Preprocessing
- Rows with NaN values resulting from lag or rolling operations were dropped.
- Unnecessary columns ('Hour', 'Minute') were removed.

## Correlation Analysis

The correlation matrix was computed to identify relationships between features. Key observations include:
- High correlation between `A_GH_ft` and `A_GH_ft_Lag1` (0.95).
- High correlation between `A_GHTW_ft` and `A_GHTW_ft_Lag1` (0.96).
- Low correlation of `Is_Weekend` with other features.

## Feature Importances

A Random Forest Regressor was trained to assess the importance of each feature. The top features based on importance were:
- **A_GH_ft_Rolling_Mean_3**: 80.7%
- **A_GH_ft_Lag1**: 10.0%
- **A_GHTW_ft_B1_D_SP_inches_Interaction**: 4.5%

### Feature Importance Plot
A bar plot illustrating the importance of features was generated to visualize their relative significance.

## Threshold Calculation

The thresholds for flood severity were determined using percentiles of `A_GH_ft` values:
- **minThreshold**: 5th percentile.
- **maxThreshold**: 95th percentile.

### Flood Severity Classification
The flood severity is classified based on the thresholds:
- **Low**: If `A_GH_ft` < minThreshold.
- **Moderate**: If minThreshold ≤ `A_GH_ft` < maxThreshold.
- **High**: If `A_GH_ft` ≥ maxThreshold.

## Model Development

### Feature Calculation
For a given input, the following features are computed:
- **A_GH_ft_Rolling_Mean_3**: 3-day rolling mean of `A_GH_ft`.
- **A_GH_ft_Lag1**: Lagged value of `A_GH_ft`.
- **A_GHTW_ft_B1_D_SP_inches_Interaction**: Interaction term between `A_GHTW_ft` and `B1_D-SP_inches`.

### Random Forest Classifier
A Random Forest Classifier was trained using the features `A_GH_ft_Rolling_Mean_3`, `A_GH_ft_Lag1`, and `A_GHTW_ft_B1_D_SP_inches_Interaction`. The model predicts flood severity based on these inputs.

### Prediction Example
For user inputs:
- **A_GH_ft**: 8.5
- **A_GHTW_ft**: 4.9
- **B1_D_SP_inches**: 0.3

The model calculates the necessary features and predicts the flood severity.

### Model Performance
The model's performance was evaluated using accuracy and mean squared error metrics.

## Conclusion

The Threshold Based Alert Algorithm (TBA) combined with the Random Forest Classifier provides a robust method for predicting flood severity based on historical data. The engineered features and thresholds derived from the data enable accurate classification of flood severity into low, moderate, and high categories.


## Our Model Approach

### Model Overview

Our approach combines several machine learning techniques to predict flood severity:

1. **Feature Engineering and Selection**:
   - We created various features including lagged values, rolling statistics, and interaction terms to capture temporal dependencies and interactions between measurements.
   - Important features were identified using a Random Forest Regressor to ensure the model focuses on the most predictive variables.

2. **Ensemble Regressor for Feature Selection**:
   - A RF Regressor was used to predict the gage height (`A_GH_ft`). This model was chosen for its ability to handle complex interactions and provide feature importance scores.
   - The model’s performance was evaluated using Mean Squared Error (MSE), and the feature importances were plotted to visualize which features had the most impact on predictions.

3. **Threshold-Based Alert Algorithm (TBA)**:
   - We calculated percentiles of the gage height values to define thresholds for flood severity classification.
   - These thresholds were used to categorize flood severity into 'Low', 'Moderate', and 'High' based on the predicted gage height.

4. **Random Forest Classifier for Severity Prediction**:
   - A Random Forest Classifier was trained using engineered features (`A_GH_ft_Rolling_Mean_3`, `A_GH_ft_Lag1`, `A_GHTW_ft_B1_D_SP_inches_Interaction`) to classify flood severity.
   - This model predicts the severity level based on input values and the calculated features, allowing for a straightforward classification of flood risk.


