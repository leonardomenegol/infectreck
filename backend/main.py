from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.ensemble import IsolationForest
from prophet import Prophet

app = FastAPI()

# Database setup
DATABASE_URL = "postgresql+asyncpg://user:password@localhost/dbname"
engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

# Models
class AnalysisData(BaseModel):
    data: list

# Endpoints
@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

@app.get("/unidade/{codigo}")
def get_unidade(codigo: str):
    return {"codigo": codigo, "info": "Hospital, unidades e setores"}

@app.get("/dados/hospital")
def get_dados_hospital():
    return {"dados": "Dados agregados por hospital"}

@app.get("/dados/setor/{id}")
def get_dados_setor(id: int):
    return {"id": id, "dados": "Dados temporais de um setor"}

@app.get("/dados/leito/{id}")
def get_dados_leito(id: int):
    return {"id": id, "dados": "Dados do paciente e coleta"}

@app.post("/analisar")
async def post_analisar(data: AnalysisData):
    # Convert data to DataFrame
    df = pd.DataFrame(data.data)

    # Temporal regression with Prophet
    model = Prophet()
    model.fit(df)
    forecast = model.predict(df)

    # Outlier detection
    isolation_forest = IsolationForest()
    outliers = isolation_forest.fit_predict(df)

    # Clustering with K-Means
    kmeans = KMeans(n_clusters=3)
    clusters = kmeans.fit_predict(df)

    # Save analysis results to Supabase
    async with SessionLocal() as session:
        async with session.begin():
            # Example: Save forecast, outliers, and clusters to a table
            session.execute(
                "INSERT INTO analysis_results (forecast, outliers, clusters) VALUES (:forecast, :outliers, :clusters)",
                {"forecast": forecast.to_dict(), "outliers": outliers.tolist(), "clusters": clusters.tolist()}
            )

    return {"resultado": "Análise concluída", "dados_recebidos": data.data}

# Function for outbreak analysis
def analisar_surtos(dataframe):
    # Group data by hospital, sector, and date
    grouped_data = dataframe.groupby(['hospital', 'setor', 'data']).sum()

    # Temporal regression with Prophet
    prophet_model = Prophet()
    prophet_model.fit(grouped_data.reset_index())
    forecast = prophet_model.predict(grouped_data.reset_index())

    # Outlier detection with Isolation Forest
    isolation_forest = IsolationForest()
    outliers = isolation_forest.fit_predict(grouped_data)

    # Clustering with KMeans
    kmeans = KMeans(n_clusters=3)
    clusters = kmeans.fit_predict(grouped_data)

    # Return analysis results
    return {
        "forecast": forecast.to_dict(),
        "outliers": outliers.tolist(),
        "clusters": clusters.tolist()
    }
