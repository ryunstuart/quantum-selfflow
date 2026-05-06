from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Quantum SelfFlow API")

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ZipCheckRequest(BaseModel):
    zip_codes: str

@app.get("/")
def home():
    return {"message": "Quantum SelfFlow Backend is running!"}

@app.post("/api/zip-check")
def zip_check(request: ZipCheckRequest):
    # Simulate real Priority PPO check
    zips = request.zip_codes.split(',')
    doctor_count = len(zips) * 45 + 30  # Fake realistic number
    
    return {
        "status": "success",
        "coverageLevel": "Excellent",
        "doctors": doctor_count,
        "message": f"Coverage checked for {request.zip_codes}",
        "recommendation": "Strong Priority PPO network coverage detected."
    }