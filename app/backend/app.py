from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from route.main_route import router as main_router



# Allowing Server For Development
app = FastAPI(title="Blood Cancer Object Detection API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(main_router)

