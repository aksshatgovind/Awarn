'''
This script cleans the dataset of the Format: Data_Dictionary
'''
import pandas as pd
import numpy as np
import os
import re
from scipy import stats

folder_path = 'app/dataset/Flood'

def remove_alpha(cell):
    if isinstance(cell, str):
        return re.sub(r'[A-Za-z]', '', cell)
    return cell

def clean_data(df, column_mapping):
    df.rename(columns=column_mapping, inplace=True)

    df = df.applymap(remove_alpha)

    df = df.drop(0).reset_index(drop=True)

    for column in df.columns:
        if df[column].isna().sum() == 1:
            mode_value = df[column].mode().iloc[0]
            df[column] = df[column].fillna(mode_value)
    
    for column in df.columns:
        df[column] = pd.to_numeric(df[column], errors='coerce')
        mean_value = df[column].mean()
        df[column] = df[column].fillna(mean_value)

    df = df.round(1)

    df = df.applymap(lambda x: x.replace(' [4]', '') if isinstance(x, str) else x)
    
    return df

# Define column mappings for New York and Wisconsin
column_mapping_ny = {
    'Date': 'Date',
    'Temperature,water,deg C,(Maximum)ALBANY-NY': 'A1_MaxT_degC',
    'Temperature,water,deg C,(Minimum)ALBANY-NY': 'A1_MinT_degC',
    'Temperature,water,deg C,(Mean)ALBANY-NY': 'A1_MeanT_degC',
    'Temperature,water,deg C,(Maximum)ALBANY-NY.1': 'A2_MaxT_degC',
    'Temperature,water,deg C,(Minimum)ALBANY-NY.1': 'A2_MinT_degC',
    'Temperature,water,deg C,(Mean)ALBANY-NY.1': 'A2_MeanT_degC',
    'Specific conductance,wat unfuS/cm @25 degC,(Maximum)ALBANY-NY': 'A_MaxSC_degC',
    'Specific conductance,wat unfuS/cm @25 degC,(Minimum)ALBANY-NY': 'A_MinSC_degC',
    'Specific conductance,wat unfuS/cm @25 degC,(Mean)ALBANY-NY': 'A_MeanSC_degC',
    'Discharge,ft3/s,(Mean)SCHOHARIE_RESERVOIR-NY': 'E_MeanT_ft^3/s',
    'Temperature,water,deg C,(Maximum)SCHOHARIE_RESERVOIR-NY': 'E_MaxT_degC',
    'Temperature,water,deg C,(Minimum)SCHOHARIE_RESERVOIR-NY': 'E_MinT_degC',
    'Temperature,water,deg C,(Mean)SCHOHARIE_RESERVOIR-NY': 'E_MeanT_degC',
    'Temperature,water,deg C,[at1,224ftaboveNAVDof1988](Minimum)LEWBEACH-NY': 'D1_MinT_degC',
    'Temperature,water,deg C,[at1,263ftaboveNAVDof1988](Minimum)LEWBEACH-NY': 'D2_MinT_degC',
    'Temperature,water,deg C,[at1,224ftaboveNAVDof1988](Maximum)LEWBEACH-NY': 'D1_MaxT_degC',
    'Temperature,water,deg C,[at1,187ftaboveNAVDof1988](Maximum)LEWBEACH-NY': 'D3_MaxT_degC',
    'Temperature,water,deg C,[at1,263ftaboveNAVDof1988](Maximum)LEWBEACH-NY': 'D2_MaxT_degC',
    'Temperature,water,deg C,[at1,224ftaboveNAVDof1988](Mean)LEWBEACH-NY': 'D1_MeanT_degC',
    'Temperature,water,deg C,[at1,263ftaboveNAVDof1988](Mean)LEWBEACH-NY': 'D2_MeanT_degC',
    'Temperature,water,deg C,[at1,187ftaboveNAVDof1988](Minimum)LEWBEACH-NY': 'D3_MinT_degC',
    'Temperature,water,deg C,[at1,187ftaboveNAVDof1988](Mean)LEWBEACH-NY': 'D3_MeanT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,053\nft\nabove\nNAVD\nof\n1988]\n(Minimum)KELSEY-NY': 'C1_MinT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,053\nft\nabove\nNAVD\nof\n1988]\n(Mean)KELSEY-NY': 'C1_MeanT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,107\nft\nabove\nNAVD\nof\n1988]\n(Mean)KELSEY-NY': 'C2_MeanT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,107\nft\nabove\nNAVD\nof\n1988]\n(Minimum)KELSEY-NY': 'C2_MinT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,144\nft\nabove\nNAVD\nof\n1988]\n(MeanKELSEY-NY': 'C3_MeanT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,107\nft\nabove\nNAVD\nof\n1988]\n(Maximum)KELSEY-NY': 'C2_MaxT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,144\nft\nabove\nNAVD\nof\n1988]\n(Minimum)KELSEY-NY': 'C3_MinT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,144\nft\nabove\nNAVD\nof\n1988]\n(Maximum)KELSEY-NY': 'C3_MaxT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,053\nft\nabove\nNAVD\nof\n1988]\n(Maximum)KELSEY-NY': 'C1_MaxT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,425\nft\nabove\nNAVD\nof\n1988]\n(Maximum)NEVERSINK-NY': 'B1_MaxT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,425\nft\nabove\nNAVD\nof\n1988]\n(Mean)NEVERSINK-NY': 'B1_MeanT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,355\nft\nabove\nNAVD\nof\n1988]\n(Minimum)NEVERSINK-NY': 'B3_MinT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,355\nft\nabove\nNAVD\nof\n1988]\n(Mean)NEVERSINK-NY': 'B3_MeanT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,383\nft\nabove\nNAVD\nof\n1988]\n(Minimum)NEVERSINK-NY': 'B2_MinT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,383\nft\nabove\nNAVD\nof\n1988]\n(Maximum)NEVERSINK-NY': 'B2_MaxT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,355\nft\nabove\nNAVD\nof\n1988]\n(Maximum)NEVERSINK-NY': 'B3_MaxT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,383\nft\nabove\nNAVD\nof\n1988]\n(Mean)NEVERSINK-NY': 'B2_MeanT_degC',
    'Temper\nature,\nwater,\ndeg C,\n[at\n1,425\nft\nabove\nNAVD\nof\n1988]\n(Minimum)NEVERSINK-NY': 'B1_MinT_degC',
    'Temper\nature,\nwater,\ndeg C,\n(Maximum)SKANEATELES-NY': 'F_MaxT_degC',
    'Temper\nature,\nwater,\ndeg C,\n(Minimum)SKANEATELES-NY': 'F_MinT_degC',
    'Temper\nature,\nwater,\ndeg C,\n(Mean)SKANEATELES-NY': 'F_MeanT_degC',
    'Specif\nic \nconduc\ntance,\nwat unf\nuS/cm @\n25 degC,\n(Maximum)SKANEATELES-NY': 'F_MaxSC_degC',
    'Specif\nic \nconduc\ntance,\nwat unf\nuS/cm @\n25 degC,\n(Minimum)SKANEATELES-NY': 'F_MinSC_degC',
    'Specif\nic \nconduc\ntance,\nwat unf\nuS/cm @\n25 degC,\n(Mean)SKANEATELES-NY': 'F_MeanSC_degC',
    'Temper\nature,\nwater,\ndeg C,\n(Maximum)PORT_HENRY-NY': 'G_MaxT_degC',
    'Temper\nature,\nwater,\ndeg C,\n(Minimum)PORT_HENRY-NY': 'G_MinT_degC',
    'Temper\nature,\nwater,\ndeg C,\n(Mean)PORT_HENRY-NY': 'G_MeanT_degC',
    'Precip\nitation\ntotal,\ninches,\n(Sum)PORT_HENRY-NY': 'G_D-SP_inches',
    'Temper\nature,\nwater,\ndeg C,\n(Minimum)ROUSES_POINT-NY': 'H_MinT_degC',
    'Temper\nature,\nwater,\ndeg C,\n(Mean)ROUSES_POINT-NY': 'H_MeanT_degC',
    'Temperature,water,deg C,(Maximum)ROUSES_POINT-NY': 'H_MaxT_degC',
    'Daily Mean Discharge, cubic feet per second - DUNHAM_BASIN-NY': 'I_MeanD_ft^3/s',
    'Daily Instantaneous Gage height, feet - CRANBERRY_LAKE-NY': 'J_D-IGH_ft'
}

column_mapping_wi = {
    'Date': 'Date',
    'Gage,height,feet,(Mean)WIND_LAKE(WI)': 'A_GH_ft',
    'Gage,height,feet,TAILWATER(Mean)WIND_LAKE(WI)': 'A_GHTW_ft',
    'Daily Sum Precipitation, total, inches(AREA-1)WIND_LAKE(WI)': 'A1_D-SP_inches',
    'Daily Sum Precipitation, total, inches(AREA-2)WIND_LAKE(WI)': 'A2_D-SP_inches',
    'Daily Sum Precipitation, total, inches(AREA-1)WATERFORD(WI)': 'B1_D-SP_inches',
    'Daily Sum Precipitation, total, inches(AREA-1)WATERFORD(WI).1': 'B2_D-SP_inches',
    'Daily Mean Gage height, feet - SHAWANO(WI)': 'C_D-MGH_ft',
    'Daily Mean Gage height, feet - WESTFIELD(WI)': 'D_D-MGH_ft',
    'Daily Mean Gage height, feet - GREEN_LAKE(WI)': 'E_D-MGH_ft',
    'Daily Mean Gage height, feet - STOUGHTON(WI)': 'F_D-MGH_ft',
    'Relative humidity,percent,(Maximum)GREENLEAF(WI)': 'G_MaxRH_%',
    'Relative humidity,percent,(Minimum)GREENLEAF(WI)': 'G_MinRH_%',
    'Relative humidity,percent,(Mean)GREENLEAF(WI)': 'G_MeanRH_%'
}

save_fold = 'app/dataset/Cleaned'
# Load and clean New York data
ny_filename = 'NewYork_100.xlsx'
ny_filepath = os.path.join(folder_path, ny_filename)
ny_data = pd.read_excel(ny_filepath)
ny_cleaned_data = clean_data(ny_data, column_mapping_ny)
ny_cleaned_data.to_csv(os.path.join(save_fold, 'Cleaned_NewYork_100.csv'), index=False)

# Load and clean Wisconsin data
wi_filename = 'Wisconson_100.xlsx'
wi_filepath = os.path.join(folder_path, wi_filename)
wi_data = pd.read_excel(wi_filepath)
wi_cleaned_data = clean_data(wi_data, column_mapping_wi)
wi_cleaned_data.to_csv(os.path.join(save_fold, 'Cleaned_Wisconsin_100.csv'), index=False)

print("Data cleaning and saving complete.")