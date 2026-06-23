from fastapi import APIRouter

from app.kubernetes.client import get_copilot_answer

router = APIRouter()


@router.get("/copilot")
def copilot(

    question: str

):

    return {

        "answer":

        get_copilot_answer(

            question

        )

    }