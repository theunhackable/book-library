import { MouseEvent, useState } from 'react'
import { TableCell } from '../ui/table'
import { Button } from '../ui/button'
import { deleteBook, updateBook } from '@/lib/data';
import Link from 'next/link';
import EditBookName from './EditBookName';
type ToReadRowProps = {
  book: Book;
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}
const ToReadRow = ({book, books, setBooks}: ToReadRowProps) => {

  const {book_id, book_name, book_status} = book;

  const [edit, setEdit] = useState<boolean>(false);
  
  const handleDelete = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    const res = await deleteBook(book_id)
    if(res) {
      const newBooks: Book[] = books.filter((book: Book) => book.book_id !== book_id)
      setBooks(newBooks)
    }
  }

  const handleToRead = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    if (book_id){
      const newBook = {...book, book_status: 'to-read'}
      const res = await updateBook(book_id, newBook)
      if(res) {

        setBooks(prev => {
          const newBooks = prev?.map( (book: Book) => {
            if(book.book_id === book_id) {
              return {
                ...book,
                book_status: 'to-read'
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
      book.book_status === 'to-read' ?
        <>
          <p>
            {book.book_name}
          </p>
          <Button onClick={handleDelete} className="bg-red-600 my-2">Delete</Button>
          <Button onClick={() => {setEdit(true)}}>Edit</Button>
          {edit ? <EditBookName book={book} setBooks={setBooks} setEdit={setEdit}/> : <></>}
        </> :
        <Button onClick={handleToRead} className="bg-yellow-600" > To Read </Button>
    }

  </TableCell>
  )
}

export default ToReadRow
