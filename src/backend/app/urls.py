from django.urls import path
from src.backend.app import views

urlpatterns = [
    path('flood-risk-data/', views.get_flood_risk_data, name='flood-risk-data'),
]