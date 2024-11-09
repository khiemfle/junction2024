# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

# Create FastAPI instance
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model for error reports
class ErrorReport(BaseModel):
    title: str
    description: str
    severity: str
    stack_trace: Optional[str] = None

# Store error reports (replace with database in production)
error_reports = []

@app.get("/")
async def root():
    return {"message": "Error Reporting API is running"}

@app.post("/api/errors")
async def create_error_report(error: ErrorReport):
    error_reports.append(error.dict())
    return {"status": "success", "message": "Error report created"}

@app.get("/api/errors")
async def get_error_reports():
    return error_reports

# Make sure this is at the bottom of the file
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)