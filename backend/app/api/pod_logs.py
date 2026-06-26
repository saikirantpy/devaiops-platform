from fastapi import APIRouter

from app.kubernetes.client import get_pod_logs

router = APIRouter()


@router.get("/pods/{namespace}/{pod}/logs")
def pod_logs(
    namespace: str,
    pod: str,
):
    return {
        "logs": get_pod_logs(
            namespace,
            pod,
        )
    }