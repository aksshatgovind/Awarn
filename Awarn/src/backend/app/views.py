from django.http import JsonResponse
from src.backend.app.models import FloodRiskRegion  #Django model to represent flood risk regions
from app.models.ml import LDA
from src.ml_models.final import flood_risk_lda

def get_flood_risk_data(request):
    lda_model = LDA()

    flood_risk = flood_risk_lda 
    '''
    region_data = map_predictions(flood_risk)
    return JsonResponse(region_data, safe=False)
    '''
