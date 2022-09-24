from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from random import random
from random import seed
import json 
import sqlite3
from datetime import datetime, timedelta
import pandas as pd

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

def char_generator():
    now = datetime.today()
    for idx in range(10):
        seed(idx)
        yield idx, datetime.now() + timedelta(days=idx, hours=-idx), random()*100

def init_db():
    c = conn.cursor()
    c.execute('CREATE TABLE IF NOT EXISTS items (id integer primary key, date text, value integer )')     
    c.execute('''
        CREATE TABLE IF NOT EXISTS comments (
            id integer primary key,  
            item_id TEXT,
            title TEXT, 
            description TEXT, 
            author TEXT, 
            date TEXT,
            FOREIGN KEY(item_id) REFERENCES items(id))
        ''')     
    c.executemany("insert into items(id, date, value) values (?, ? ,?)", char_generator())          
    conn.commit()
    print('commit')

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
        return { items: [] }


@app.get("/item/{item_id}/comments")
async def item_comments(item_id: str):
    with open('storage.json') as f:
        data = json.load(f)
        print(data)
        idx = data.index(lambda p: p['id'] == int(item_id))
        return data[idx]['comments'] 
