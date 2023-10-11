import sqlite3
from dataclasses import dataclass
from typing import List



@dataclass
class Book:
    book_id: int
    book_name: str
    book_status: str

# Book Repository
class BookRepository:
    def __init__(self, connection):
        self.connection = connection
        self.create_table()

    def create_table(self):
        cursor = self.connection.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS books (
                book_id INTEGER PRIMARY KEY,
                book_name name TEXT,
                book_status TEXT
            )
            """
        )
        cursor.close()
        self.connection.commit()

    def get_all_books(self) -> List[Book]:
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM books")
        books = [Book(*row) for row in cursor.fetchall()]
        cursor.close()
        return books

    def get_book_by_id(self, book_id: int) -> Book:
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM books WHERE book_id = ?", (book_id,))
        try:
            book = Book(*cursor.fetchone())
        except(Exception):
            book = None
        
        cursor.close()
        return book

    def create_book(self, book: Book):
        cursor = self.connection.cursor()        
        cursor.execute(
            "INSERT INTO books (book_name, book_status) VALUES (?, ?)",
            (book["book_name"], book["book_status"]),
        )
        self.get_book_by_id(cursor.lastrowid)
        self.connection.commit()
        cursor.close()
        return self.get_book_by_id(cursor.lastrowid)

    def update_book_status(self, book_id: int, new_status: str) -> Book:
        cursor = self.connection.cursor()
        cursor.execute(
            "UPDATE books SET book_status = ? WHERE book_id = ?",
            (new_status, book_id),
        )
        self.connection.commit()
        cursor.close()
        return self.get_book_by_id(book_id)
    
    def update_book_name(self, book_id: int, new_name: str) -> Book:
        cursor = self.connection.cursor()
        cursor.execute(
            "UPDATE books SET book_name = ? WHERE book_id = ?",
            (new_name, book_id),
        )
        self.connection.commit()
        cursor.close()
        return self.get_book_by_id(book_id)
        
    def delete_book(self, book_id: int) -> Book:
        book_to_delete = self.get_book_by_id(book_id)
        if book_to_delete:
            cursor = self.connection.cursor()
            cursor.execute("DELETE FROM books WHERE book_id = ?", (book_id,))
            self.connection.commit()
            cursor.close()
        return book_to_delete

