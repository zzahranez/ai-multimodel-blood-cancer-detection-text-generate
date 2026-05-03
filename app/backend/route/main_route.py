from fastapi import APIRouter, File, UploadFile
from services.yolo_service import get_api_info, detect_cell_service
from services.nlp_service import text_generate_service
from pydantic import BaseModel

router = APIRouter()

# =======================================
# ====== ENDPOINT OBJECT DETECTION ======
# =======================================

@router.get("/api-info")
async def api_info():
    return get_api_info()

@router.post("/detect")
async def detect(file: UploadFile = File(...)):
    contents = await file.read()
    result = detect_cell_service(contents)
    return result


# =======================================
# =========== TEXT GENERATE =============
# =======================================

class GenerateRequest(BaseModel):
    text: str


@router.post("/text-generate")
async def text_generate(request: GenerateRequest):
        result = text_generate_service(request.text)
        return {
             "message" : "Success",
             "response" : result
        }
