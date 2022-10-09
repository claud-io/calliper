from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from random import random
import sqlite3
from datetime import datetime, timedelta
import pandas as pd
from pydantic import BaseModel

class Comment(BaseModel):
    username: str
    description: str
    date: datetime

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conn = sqlite3.connect("calliper.db")

 
def item_generator():
    for idx in range(30):
        yield datetime.now() + timedelta(days=idx, hours=-idx), random()*100

def init_db():
    cur = conn.cursor()
    cur.execute('CREATE TABLE IF NOT EXISTS items (id integer primary key AUTOINCREMENT, date text, value integer )')     
    cur.execute('''
        CREATE TABLE IF NOT EXISTS comments (
            id integer primary key AUTOINCREMENT,  
            item_id TEXT,
            description TEXT, 
            username TEXT, 
            date TEXT,
            FOREIGN KEY(item_id) REFERENCES items(id))
        ''')     
    cur.executemany("insert into items(date, value) values (? ,?)", item_generator())          
    conn.commit()

@app.get("/init")
async def init():
    try:
        init_db()
        return True
    except:
        return JSONResponse( status_code=500, content={"message": f"DB already initialized."} )


@app.get("/items")
async def items():
    try:
        sql = pd.read_sql_query('''SELECT i.id, i.date, i.value, count(c.id) as commentsCount
                                     FROM items i
                                     LEFT OUTER JOIN comments c on c.item_id =i.id
                                     GROUP BY i.id, i.date, i.value''',conn)
        return sql.to_dict('records')
    except:
        return JSONResponse( status_code=500, content={"message": f"An error occurred."} )


@app.get("/items/{item_id}/comments")
async def item_comments(item_id: str):
    try:
        sql = pd.read_sql_query('''SELECT id, description, username, date
                                    FROM Comments where item_id = (?)''',conn, params=(item_id,))
        return sql.to_dict('records')
    except:
        return JSONResponse( status_code=500, content={"message": f"An error occurred."}  )


@app.put("/items/{item_id}/comments/add")
async def add_item_comment(item_id: str, comment: Comment):
    try:   
        cur = conn.cursor()

        db_query = """INSERT INTO comments (item_id, username, description, date) 
                    VALUES (:item_id, :username, :description, :date)"""

        cur.execute(db_query, (item_id, comment.username, comment.description, comment.date))
        conn.commit()
    except:
        return JSONResponse( status_code=500, content={"message": f"An error occurred."} )

