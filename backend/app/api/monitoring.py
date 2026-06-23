from fastapi import APIRouter

from app.kubernetes.client import get_monitoring

router = APIRouter()


@router.get("/monitoring")
def monitoring():

    return get_monitoring()