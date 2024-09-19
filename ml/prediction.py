import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import requests
from datetime import date
from dateutil.relativedelta import relativedelta
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.svm import SVR
from sklearn.metrics import mean_squared_error
from sklearn.metrics import r2_score
import warnings

latitude=40.7143
longitude=74.006

response=requests.get(f"https://archive-api.open-meteo.com/v1/archive?latitude={latitude}&longitude={longitude}&start_date={date.today()-relativedelta(months=2)}&end_date={date.today()}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,precipitation,rain,cloud_cover,wind_speed_10m")


response_today=requests.get(f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&hourly=relative_humidity_2m,dew_point_2m,precipitation,cloud_cover,wind_speed_10m")

warnings.filterwarnings("ignore")

data=response.json()
data_today=response_today.json()

main_data=data['hourly']
today_params=data_today['hourly']


df=pd.DataFrame(main_data)
df_today=pd.DataFrame(today_params)
df_today=df_today.iloc[:24]
df.dropna(inplace=True)
df_today.dropna(inplace=True)


df['time']=pd.to_datetime(df['time'])
df_today['time']=pd.to_datetime(df_today['time'])

df_today.set_index('time',inplace=True)

x=df.drop(columns=["temperature_2m","rain"])
y=df[["temperature_2m","rain"]]





colums_to_lagg=['relative_humidity_2m','dew_point_2m','precipitation','cloud_cover','wind_speed_10m']

for col in colums_to_lagg:
    df[f"{col}_lag_12h"]=df[col].shift(12)
    df[f"{col}_lag_24h"]=df[col].shift(24)
    df[f"{col}_lag_36h"]=df[col].shift(36)
    df[f"{col}_lag_48h"]=df[col].shift(48)
    df[f"{col}_lag_72h"]=df[col].shift(72)

df.set_index('time',inplace=True)


df.dropna(inplace=True)

for col in colums_to_lagg:
    df_today[f"{col}_lag_12h"]=df_today[col].shift(12)
    df_today[f"{col}_lag_24h"]=df_today[col].shift(24)
    df_today[f"{col}_lag_36h"]=df_today[col].shift(36)
    df_today[f"{col}_lag_48h"]=df_today[col].shift(48)
    df_today[f"{col}_lag_72h"]=df_today[col].shift(72)

# df_today

X=df[df.columns[~df.columns.isin(['temperature_2m','rain'])]]

dummy_X=X.copy()
y1=df[['temperature_2m']]
y2=df[['rain']]

scaler=StandardScaler()
X=scaler.fit_transform(X)

X1_train, X1_test, y1_train, y1_test = train_test_split(
    X, y1, test_size=0.33, random_state=42)


X2_train, X2_test, y2_train, y2_test = train_test_split(
    X, y2, test_size=0.33, random_state=42)


X2_train, X2_test, y2_train, y2_test = train_test_split(
    X, y2, test_size=0.33, random_state=42)


X1_train_scaled=scaler.fit_transform(X1_train)
X1_test_scaled=scaler.transform(X1_test)

X2_train_scaled=scaler.fit_transform(X2_train)
X2_test_scaled=scaler.transform(X2_test)


svr1=SVR()

svr1=SVR()
svr2=SVR()

svr1.fit(X1_train_scaled,y1_train)
svr2.fit(X2_train_scaled,y2_train)


y1_pred=svr1.predict(X1_test_scaled)
y2_pred=svr2.predict(X2_test_scaled)
mse=mean_squared_error(y1_pred,y1_test)
mse2=mean_squared_error(y2_pred,y2_test)

r2_=r2_score(y1_test,y1_pred)


df_today=df_today.fillna(0)
final_test=df_today.iloc[[-1]]
# final_test

yesterday_data=dummy_X.iloc[-24:]
# yesterday_data=(final_test)
yesterday_data_scaled=scaler.transform(yesterday_data)
tomorrow_pred_temp=svr1.predict(yesterday_data)
# tomorrow_pred_temp.mean()

tomorrow_pred_rain=svr2.predict(yesterday_data)
# tomorrow_pred_temp.mean()

print("\n","*"*30,"\n")
print("tomorrow's temp in degC  : {} \ntomorrow's rain in mm : {}".format(tomorrow_pred_temp.mean(),tomorrow_pred_rain.mean()))
print("\n","*"*30,"\n")
