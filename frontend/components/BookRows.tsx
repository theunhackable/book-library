"use client"
import { TableCell, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { MouseEvent, use, useEffect, useState } from "react";



type BookRowsProps = {
  books: Book[] | null;
  setBooks: React.Dispatch<React.SetStateAction<Book[] | null>>;
}

const BookRows = ({books, setBooks}: BookRowsProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  
  const updateBook = async (book_id: number, new_status: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/books/${book_id}?new_status=${new_status}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const book = await res.json();
      setBooks(prev => {
        if (prev) {
          const newBooks = prev.map((book: Book) => {
            if (book.book_id === book_id) {
              book.book_status = new_status;
            }
            return book;
          })
          return newBooks;
        }
        return prev;
      })

    } catch (err) {
      console.log(err)
    }
    setLoading(false);
  }

  const deleteBook = async (book_id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/books/${book_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const book = await res.json();
      setBooks(prev => {
        if (prev) {
          const newBooks = prev.filter((book: Book) => book.book_id !== book_id)
          return newBooks;
        }
        return prev;
      })

    } catch (err) {
      console.log(err)
    }
    setLoading(false);
  }

  const handleDelete = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const book_name = e.currentTarget.value;

    const book_id = books?.filter((book: Book) => book.book_name === book_name)[0].book_id;
    if (book_id)
      await deleteBook(book_id)
    else alert('Book not found')
  }

  const handleComplete = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const book_name = e.currentTarget.value;

    const book_id = books?.filter((book: Book) => book.book_name === book_name)[0].book_id;
    if (book_id)
      await updateBook(book_id, 'completed')
    else alert('Book not found')



  }

  const handleProgress = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const book_name = e.currentTarget.value;

    const book_id = books?.filter((book: Book) => book.book_name === book_name)[0].book_id;
    if (book_id)
      await updateBook(book_id, 'in-progress')
    else alert('Book not found')
  }

  const handleToRead = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const book_name = e.currentTarget.value;

    const book_id = books?.filter((book: Book) => book.book_name === book_name)[0].book_id;
    if (book_id)
      await updateBook(book_id, 'to-read')
    else alert('Book not found')
  }

  return (
    <>
      {loading ? <div className="bg-slate-200 h-full w-full">Loading...</div> : <></>}

      {books?.map((book: Book) => (
        <TableRow key={book.book_id} className="max-w-[700px]">

          <TableCell className="text-center">
            {
              book.book_status === 'to-read' ?
                <>
                  <p>
                    {book.book_name}
                  </p>
                  <Button onClick={handleDelete} value={book.book_name} className="bg-red-600 my-2">Delete</Button>
                </> :
                <Button onClick={handleToRead} value={book.book_name} className="bg-yellow-600" disabled={loading}> To Read </Button>
            }

          </TableCell>

          <TableCell className="text-center">
            {
              book.book_status === 'in-progress' ?
                <>
                  <p>
                    {book.book_name}
                  </p>
                  <Button onClick={handleDelete} value={book.book_name} className="bg-red-600 my-2">Delete</Button>
                </> :
                <Button onClick={handleProgress} value={book.book_name} className="bg-blue-600" disabled={loading}> Reading </Button>
            }

          </TableCell>

          <TableCell className="text-center">
            {
              book.book_status === 'completed' ?
                <>
                  <p>
                    {book.book_name}
                  </p>
                  <Button onClick={handleDelete} value={book.book_name} className="bg-red-600 my-2">Delete</Button>
                </> :
                <Button onClick={handleComplete} value={book.book_name} className="bg-green-600" disabled={loading}> Completed </Button>
            }

          </TableCell>

        </TableRow>

      )
      )}
    </>
  )


}

export default BookRows

