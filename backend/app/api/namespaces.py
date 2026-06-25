from fastapi import APIRouter

from app.kubernetes.client import get_namespaces

router = APIRouter()


@router.get("/namespaces")
def namespaces():

    return get_namespaces()