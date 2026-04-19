import asyncio
from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from models.detector import DeepfakeDetector

router = APIRouter()
detector = DeepfakeDetector()

ALLOWED_TYPES = {
    "image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif",
    "video/mp4", "video/webm", "video/avi", "video/mov", "video/quicktime",
}
MAX_SIZE = 100 * 1024 * 1024  # 100 MB


@router.post("/analyze")
async def analyze_media(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{file.content_type}'. Supported: images (jpg, png, webp) and videos (mp4, webm, mov).",
        )

    contents = await file.read()

    if len(contents) > MAX_SIZE:
        raise HTTPException(status_code=400, detail="File too large. Maximum size is 100 MB.")

    # Simulate real model inference latency
    await asyncio.sleep(1.5)

    result = detector.analyze(contents, file.filename or "upload", file.content_type)

    return JSONResponse(
        content={
            "success": True,
            "filename": file.filename,
            "file_size": len(contents),
            "content_type": file.content_type,
            **result,
        }
    )


@router.get("/stats")
async def platform_stats():
    """Public platform statistics (static demo data)."""
    return {
        "total_analyzed": 14_892,
        "deepfakes_detected": 7_341,
        "accuracy_rate": 97.3,
        "avg_processing_time_s": 1.8,
        "supported_formats": ["jpg", "png", "webp", "mp4", "webm", "mov"],
    }
