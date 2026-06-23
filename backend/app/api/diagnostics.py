from fastapi import APIRouter

from app.kubernetes.client import get_diagnostics

router = APIRouter()


@router.get("/diagnostics")
def diagnostics():

    return get_diagnostics()