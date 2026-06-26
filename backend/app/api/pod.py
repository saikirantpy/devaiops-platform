from fastapi import APIRouter

from app.kubernetes.client import get_pod

router = APIRouter()


@router.get("/pods/{namespace}/{pod_name}")
def pod_details(
    namespace: str,
    pod_name: str,
):

    return get_pod(
        namespace,
        pod_name,
    )