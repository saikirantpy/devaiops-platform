from fastapi import APIRouter

from app.kubernetes.client import (
    get_pod_count,
    get_pods,
)

router = APIRouter()


@router.get("/kubernetes")
def kubernetes_status():

    return {
        "pod_count": get_pod_count()
    }


@router.get("/pods")
def pods():

    return get_pods()