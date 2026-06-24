from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.monitoring import router as monitoring_router

from app.api.health import router as health_router
from app.api.docker import router as docker_router
from app.api.kubernetes import router as kubernetes_router
from app.api.deployments import router as deployments_router
from app.api.copilot import router as copilot_router

from app.api.diagnostics import (
    router as diagnostics_router
)

from app.api.prometheus import (
    router as prometheus_router
)

app = FastAPI(
    title="DevAIOps Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[

        "http://localhost:3000",

        "http://localhost:3001",

    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.include_router(health_router)

app.include_router(docker_router)

app.include_router(kubernetes_router)

app.include_router(deployments_router)

app.include_router(
    monitoring_router
)

app.include_router(
    diagnostics_router
)

app.include_router(
  copilot_router
)

app.include_router(
    prometheus_router
)

@app.get("/")
def root():

    return {
        "message": "DevAIOps Backend Running"
    }