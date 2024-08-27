import pandas as pd
from sklearn.utils import shuffle
from sklearn.metrics import mean_absolute_error, classification_report
from sklearn.preprocessing import Normalizer, MinMaxScaler
from datetime import datetime
from imblearn.over_sampling import SMOTE

# from app.utils.utils import MLUtils
import app.models.ml as ML

files = ['Cauvery','Godavari','Krishna','Mahanadi','Son']
filename = files[0]

prePro = ML.PreProcess(filename)

data = prePro.read_data()
data = prePro.fill_null_entries(data)
data, d1 = prePro.preprocess_dates(data)

y = data['Flood']
for i in range(len(y)):
    if y[i] >= 0.1:
        y[i] = 1
y = pd.DataFrame(y)

data.drop('Flood', axis=1, inplace=True)
    
Scaler = MinMaxScaler(feature_range=(0, 1))
Transform = Scaler.fit_transform(data)
Transform = pd.DataFrame(Transform, columns=['Discharge', 'flood runoff', 'daily runoff', 'weekly runoff'])

data = Transform
data = pd.concat([d1, data], axis=1)

locate = 0
for i in range(len(data["Day"])):
    if data["Day"][i] == 31 and data["Months"][i] == 12 and data["Year"][i] == 2015:
        locate = i
        break

i = locate + 1

x_train = data.iloc[0:i, :]
y_train = y.iloc[0:i]
x_test = data.iloc[i:, :]
y_test = y.iloc[i:]

x_train.drop(labels=['Day', 'Months', 'Year'], inplace=True, axis=1)
x_test.drop(labels=['Day', 'Months', 'Year'], inplace=True, axis=1)

nl = Normalizer()
y_train = y_train.to_numpy()
y_test = y_test.to_numpy()
x_train = nl.fit_transform(x_train)
x_test = nl.transform(x_test)

sm = SMOTE(random_state=2)
X_train_res, Y_train_res = sm.fit_resample(x_train, y_train)
x_train, y_train = shuffle(X_train_res, Y_train_res, random_state=0)

lin_reg = ML.LinReg()
lin_reg.fit(x_train, y_train)
y_predict1 = lin_reg.predict(x_test)
# print("training_score",lin_reg.score(x_train, y_train))
# print("testing_score",lin_reg.score(x_test, y_test))
# print("classification_report",lin_reg.classification_report(x_test, y_test))
# print("mean_absolute_error=", mean_absolute_error(y_test, y_predict1))
y_pred_prob_linreg = lin_reg.model.predict_proba(x_test)[:, 1]
flood_risk_linreg = [lin_reg.classify_flood_risk(prob) for prob in y_pred_prob_linreg]
# print("Flood_Risk:",flood_risk_linreg)


lda = ML.LDA()
lda.fit(x_train, y_train)
y_predict3 = lda.predict(x_test)
# print("training_score",lda.score(x_train, y_train))
# print("testing_score",lda.score(x_test, y_test))
# print("classification_report",lda.classification_report(x_test, y_test))
mae_lda = mean_absolute_error(y_test, y_predict3)
# print("mean_absolute_error=", mae_lda)
y_pred_score_lda = lda.model.decision_function(x_test)
flood_risk_lda = [lda.classify_flood_risk(score) for score in y_pred_score_lda]
# print("Flood_Risk:",flood_risk_lda)


knn = ML.KNN()
knn.fit(x_train, y_train)
y_predict4 = knn.predict(x_test)
# print("training_score",knn.score(x_train, y_train))
# print("testing_score",knn.score(x_test, y_test))
# print("classification_report",knn.classification_report(x_test, y_test))
# print("mean_absolute_error=", mean_absolute_error(y_test, y_predict4))
y_pred_score_knn = knn.model.predict_proba(x_test)[:, 1]
flood_risk_knn = [knn.classify_flood_risk(score) for score in y_pred_score_knn]
# print("Flood_Risk:",flood_risk_knn)

x_train_cnn = x_train[:784].reshape(-1, 28, 28, 1)
x_test_cnn = x_test[:784].reshape(-1, 28, 28, 1)

cnn = ML.CNNModel()
cnn.train(x_train_cnn, y_train, epochs=10)
accuracy = cnn.evaluate(x_test_cnn, y_test)
# print("Accuracy:", accuracy)
predictions = cnn.predict(x_test_cnn)
# print("Predictions:", predictions)


'''
LDA also has the highest testing score (99.5%), indicating strong overall performance on the test set.

LDA has the highest precision for class 1 (100%) and a relatively high recall (71%), making it a good choice if correctly identifying positive cases (flood occurrence) is essential while minimizing false positives.
'''

# MLUtils.save_model(lda, 'sLDA.pkl')



