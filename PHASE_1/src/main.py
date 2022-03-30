from fastapi import FastAPI
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from src.router import global_outbreak_router
from src.router import covid_data_router
from src.open_api.docs import *

"""
    Core Application
"""
app = FastAPI(openapi_tags=tags_metadata)
"""
    Include additional Routers
"""
app.include_router(global_outbreak_router.router)
app.include_router(covid_data_router.router)
"""
    Rate Limiting Config
"""
# limiter = Limiter(key_func=get_remote_address)
# app.state.limiter = limiter
# app.add_exception_handler(500, _rate_limit_exceeded_handler)


@app.get("/")
async def root():
    return "Welcome please visit /docs for swagger documentation or /redoc for Open API documentation"
