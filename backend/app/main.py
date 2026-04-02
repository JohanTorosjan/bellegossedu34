from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import File, UploadFile
import base64
from pydantic import BaseModel
import mysql.connector
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:80"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST", "db"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        database=os.getenv("MYSQL_DATABASE"),
    )


# --- Routes ---

@app.get("/ping")
def ping():
    return {"message": "pong 🏓"}

@app.get("/test/db")
def test_db():
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM wishes")
    rows = cursor.fetchall()
    conn.close()
    return rows


@app.get("/createdb")
def create_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS wishes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            author VARCHAR(100) NOT NULL,
            message VARCHAR(500) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cursor.execute("INSERT INTO wishes (author, message) VALUES (%s, %s)", ("Manu", "Joyeux anniversaire ma belle ! 🎉"))
    cursor.execute("INSERT INTO wishes (author, message) VALUES (%s, %s)", ("Test", "Ce site est trop bien fait 😎"))
    conn.commit()
    conn.close()
    return {"message": "DB créée ✅"}


@app.get("/createRealDb")
def create_real_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS animals (
            id INT AUTO_INCREMENT PRIMARY KEY,
            photo LONGBLOB NOT NULL,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            photo LONGBLOB NOT NULL,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()
    return {"message": "Tables animals et posts créées ✅"}


# --- Animals ---

@app.get("/animals")
def get_animals():
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM animals")
    rows = cursor.fetchall()
    conn.close()
    for row in rows:
        row["photo"] = base64.b64encode(row["photo"]).decode("utf-8")
    return rows

@app.post("/animals")
def create_animal(description: str, photo: UploadFile = File(...)):
    photo_bytes = photo.file.read()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO animals (photo, description) VALUES (%s, %s)", (photo_bytes, description))
    conn.commit()
    conn.close()
    return {"message": "Animal créé ✅"}

@app.delete("/animals/{animal_id}")
def delete_animal(animal_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM animals WHERE id = %s", (animal_id,))
    conn.commit()
    conn.close()
    return {"message": "Animal supprimé ✅"}


# --- Posts ---

@app.get("/posts")
def get_posts():
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM posts")
    rows = cursor.fetchall()
    conn.close()
    for row in rows:
        row["photo"] = base64.b64encode(row["photo"]).decode("utf-8")
    return rows

@app.post("/posts")
def create_post(title: str, description: str, photo: UploadFile = File(...)):
    photo_bytes = photo.file.read()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO posts (title, photo, description) VALUES (%s, %s, %s)", (title, photo_bytes, description))
    conn.commit()
    conn.close()
    return {"message": "Post créé ✅"}

@app.delete("/posts/{post_id}")
def delete_post(post_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM posts WHERE id = %s", (post_id,))
    conn.commit()
    conn.close()
    return {"message": "Post supprimé ✅"}