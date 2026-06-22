from fastapi import APIRouter

from app.docker.client import (
    get_container_count,
    get_containers,
)

router = APIRouter()


@router.get("/docker")
def docker_status():

    return {
        "container_count": get_container_count()
    }


@router.get("/containers")
def containers():

    return get_containers()