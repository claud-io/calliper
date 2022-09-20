from fastapi import FastAPI
import json 
import sqlite3
from datetime import datetime, timedelta
import pandas as pd

app = FastAPI()
conn = sqlite3.connect("calliper.db")

def char_generator():
    now = datetime.now()
    for idx in range(10):
        print(idx, now - timedelta(hours=idx), idx)
        yield idx, now - timedelta(hours=idx), idx

def init_db():
    c = conn.cursor()
    c.execute('CREATE TABLE IF NOT EXISTS items (ID integer primary key, date text, value integer )')     
    c.execute('''
        CREATE TABLE IF NOT EXISTS comments (
            ID integer primary key,  
            item_id TEXT,
            title TEXT, 
            description TEXT, 
            author TEXT, 
            date TEXT,
            FOREIGN KEY(item_id) REFERENCES items(ID))
        ''')     
    c.executemany("insert into items(ID, date, value) values (?, ? ,?)", char_generator())          
    conn.commit()
    print('commit')

@app.get("/init")
async def init():
    init_db()
    return True

@app.get("/items")
async def items():
    sql = pd.read_sql_query("SELECT * FROM items",conn)
    return sql.to_dict('records')

@app.get("/item/{item_id}/comments")
async def item_comments(item_id: str):
    with open('storage.json') as f:
        data = json.load(f)
        print(data)
        idx = data.index(lambda p: p['id'] == int(item_id))
        return data[idx]['comments'] 
