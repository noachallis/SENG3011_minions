from fastapi import Depends, FastAPI, HTTPException, status, Query
from typing import Optional
from datetime import datetime
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel


app = FastAPI(
    title="SENG3011-Minions",
    description="SENG3011 Deliverable 2 API",
    version="0.0.1"
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# https://fastapi.tiangolo.com/tutorial/security/simple-oauth2/
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "fakehashedsecret",
        "disabled": False,
    },
    "alice": {
        "username": "alice",
        "full_name": "Alice Wonderson",
        "email": "alice@example.com",
        "hashed_password": "fakehashedsecret2",
        "disabled": True,
    },
}

def fake_hash_password(password: str):
    return "fakehashed" + password

class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None


class UserInDB(User):
    hashed_password: str


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def fake_decode_token(token):
    # This doesn't provide any security at all
    # Check the next version
    user = get_user(fake_users_db, token)
    return user


async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# Articles
@app.get("/articles", summary="Get all articles.")
async def articles(
    key_term: Optional[str] = None,
    location: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    sort_by: Optional[str] = None,
    offset: int = 0, 
    limit: int = Query(default=100, lte=100),
    sort: Optional[str] = None
    ):
    return {"blah"}

@app.get("/articles/{article_id}", summary="Get a single article by article id.")
async def articles_id(article_id: int):
    return {"article_id": article_id}

@app.get("/articles/{article_id}/reports", summary="Get reports related to a specific article.")
async def articles_id_reports(
    article_id: int,
    offset: int = 0, 
    limit: int = Query(default=100, lte=100),
    sort_by: Optional[str] = None,
    ):
    return {"article_id": article_id}

# Reports
@app.get("/reports", summary="Get all reports.")
async def reports(
    key_term: Optional[str] = None,
    location: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    sort_by: Optional[str] = None,
    offset: int = 0, 
    limit: int = Query(default=100, lte=100),
    sort: Optional[str] = None
    ):
    return {"blah"}

@app.get("/reports/{report_id}", summary="Get a single report by report id.")
async def reports_id(report_id: int):
    return {"report_id": report_id}


# Housekeeping

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    user = UserInDB(**user_dict)
    hashed_password = fake_hash_password(form_data.password)
    if not hashed_password == user.hashed_password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {"access_token": user.username, "token_type": "bearer"}


@app.delete("/database/clear", summary="Empty entire databse.")
async def database_clear(token: str = Depends(oauth2_scheme)):
    return {"token": token}