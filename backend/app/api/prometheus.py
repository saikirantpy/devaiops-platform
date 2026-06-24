from fastapi import APIRouter

from app.prometheus.client import (

    get_prometheus_metrics

)

router = APIRouter()


@router.get("/prometheus")

def prometheus():

    return get_prometheus_metrics()
