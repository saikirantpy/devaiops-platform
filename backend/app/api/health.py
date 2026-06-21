from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health():
    return {
        "status": "healthy",
        "environment": "local",
        "frontend": "running",
        "backend": "running",
    }