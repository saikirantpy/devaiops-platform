from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.docker import router as docker_router
from app.api.kubernetes import router as kubernetes_router

app = FastAPI(
    title="DevAIOps Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)

app.include_router(docker_router)

app.include_router(kubernetes_router)


@app.get("/")
def root():
    return {
        "message": "DevAIOps Backend Running"
    }