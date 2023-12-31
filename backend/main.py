from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import InputBook, Book
from database import BookRepository
import sqlite3

app = FastAPI()
books = []

origins = ["*"] 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Replace with your allowed HTTP methods
    allow_headers=["*"],  # Replace with your allowed headers
)

db_connection = sqlite3.connect("database.db")

@app.get('/')
async def root():
    return {"message": "hello world"}

# get all books
@app.get('/books')
async def get_books():
    repository = BookRepository(db_connection)
    books = repository.get_all_books()
    return {"data": books, "message": "request success"}

# get a book
@app.get('/books/{book_id}')
async def get_book(book_id: int):
    repository = BookRepository(db_connection)
    book = repository.get_book_by_id(book_id)
    if book :
        return {"data": book, "message": "request success"}
    return {"data": [],"message": "book not found"}

# add a book
@app.post('/books')
async def add_book(book: InputBook):
    repository = BookRepository(db_connection)
    books = repository.get_all_books()
    for b in books:
        if b.book_name == book.book_name:
            return {"data": None,"message": "book already exists"}
    book = repository.create_book({"book_name": book.book_name, "book_status": "to-read"})
    return {"data": book,"message": "book added successfully"}



#update book
@app.put('/books/{book_id}')
async def update_book(book_id: int, book: Book):
    new_book = book
    repository = BookRepository(db_connection)
    
    book = repository.get_book_by_id(book_id)
    if book:
        if new_book.book_name != book.book_name:
            print("updating book name")   
            res = repository.update_book_name(book_id, new_book.book_name)
            print(res.book_name)

        elif new_book.book_status != book.book_status:
            print("updating book status")
            book = repository.update_book_status(book_id, new_book.book_status)

    if book:
        return {"data": book, "message": "successfully updated"}

    return {"data":[], "message": 'Book not found'}

#delete book
@app.delete('/books/{book_id}')
async def delete_book(book_id: int):
    repository = BookRepository(db_connection)
    book = repository.delete_book(book_id)
    if book:
        return {"data": book}
    return {"data":[], "message": 'error occured while deleting book'}