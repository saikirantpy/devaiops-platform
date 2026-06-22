from fastapi import APIRouter

from app.kubernetes.client import get_deployments

router = APIRouter()


@router.get("/deployments")
def deployments():

    return get_deployments()