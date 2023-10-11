import React, { MouseEvent, useState } from 'react'
import { TableCell } from '../ui/table'
import { Button } from '../ui/button'
import { deleteBook, updateBook } from '@/lib/data';

type CompletedRowProps = {
  book: Book;
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  
}
const CompletedRow = ( { book, books, setBooks }: CompletedRowProps) => {

  
  const {book_id, book_name, book_status} = book;
  
  const handleDelete = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    const res = await deleteBook(book_id)
    if(res) {
      const newBooks: Book[] = books.filter((book: Book) => book.book_id !== book_id)
      setBooks(newBooks)
    }
  }


  const handleComplete = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    
    if (book_id){

      const newBook = {...book, book_status: 'completed'}
      const res =  await updateBook(book_id, newBook)
      
      if(res) {
        const newBooks: Book[] = books.filter((book: Book) => book.book_id !== book_id)

        setBooks(prev => {
          const newBooks = prev?.map( (book: Book) => {
            if(book.book_id === book_id) {
              return {
                ...book,
                book_status: 'completed'
              }
            }
            return book
          })
          return newBooks
        })
      }
    }

    else alert('Book not found')
  }
  return (
    <TableCell className="text-center">
    {
      book.book_status === 'completed' ?
        <>
          <p>
            {book.book_name}
          </p>
          <Button onClick={handleDelete} className="bg-red-600 my-2">Delete</Button>
        </> :
        <Button onClick={handleComplete} className="bg-green-600"> Completed </Button>
    }

  </TableCell>

  )
}

export default CompletedRow