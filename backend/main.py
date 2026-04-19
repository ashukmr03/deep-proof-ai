from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import detection

app = FastAPI(
    title="DeepProof AI",
    description="Real-Time Deepfake Detection Platform API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(detection.router, prefix="/api/v1", tags=["detection"])


@app.get("/")
async def root():
    return {"message": "DeepProof AI API", "version": "1.0.0", "status": "online"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
