from fastapi import FastAPI
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from src.router import global_outbreak_router
from src.router import covid_data_router
from src.open_api.docs import *
from fastapi.middleware.cors import CORSMiddleware

"""
    Core Application
"""
app = FastAPI(openapi_tags=tags_metadata)

"""
    Rate Limiting Config
"""
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(429, _rate_limit_exceeded_handler)

"""
    Include additional Routers
"""
app.include_router(global_outbreak_router.router)
app.include_router(covid_data_router.router)

origins = [
    "*",
    "http://localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return "Welcome please visit /docs for swagger documentation or /redoc for Open API documentation"
