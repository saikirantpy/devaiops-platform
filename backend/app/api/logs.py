from fastapi import APIRouter

from app.logs.client import get_logs

router = APIRouter()

@router.get("/logs")

def logs():

    return get_logs()