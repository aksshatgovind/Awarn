from sklearn.model_selection import GridSearchCV
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.metrics import classification_report
from app.models.ml import LDA
from src.ml_models.final import load_river_data

param_grid = {
    'solver': ['svd', 'lsqr', 'eigen'],  # Solver algorithm
    'shrinkage': [None, 'auto', 0.1, 0.5, 0.9]  # Shrinkage parameter
}

def grid_fit(model,x_train, y_train, x_test, y_test):
    grid_search = GridSearchCV(model, param_grid, cv=5, scoring='accuracy')

    grid_search.fit(x_train, y_train)
    best_params = grid_search.best_params_
    print("Best Parameters:", best_params)

    best_model = grid_search.best_estimator_

    y_pred = best_model.predict(x_test)
    print("Classification Report:")
    print(classification_report(y_test, y_pred))


x_te, y_te, x_tr, y_tr = load_river_data('Cauvery')
lda = LDA()
grid_fit(LinearDiscriminantAnalysis(), x_tr, y_tr, x_te, y_te)

'''
Model performed best when the shrinkage parameter was set to 'None' and the solver parameter was set to 'svd'.
'''