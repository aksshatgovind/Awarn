from django.db import models

class FloodRiskRegion(models.Model):
    name = models.CharField(max_length=100)
    risk_level = models.CharField(max_length=20)  # Can be 'Low', 'Moderate', or 'High'
