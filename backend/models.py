from pydantic import BaseModel

class Book(BaseModel):
    book_id: int
    book_name: str
    book_status: str

class InputBook(BaseModel):
    book_name: str

class InputStatus(BaseModel):
    new_status: str