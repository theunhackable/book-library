"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import BookRows from "./BookRows"
import BookForm from "./BookForm";
import { useEffect, useState } from "react";

const BooksTable = () => {
  const [books, setBooks] = useState<Book[]>([]);
  
  useEffect(() => {
      
      async function fetchData() {
        try {
          const res = await fetch('http://127.0.0.1:8000/books');
          const data = await res.json();
          setBooks(data.data)
        } catch (err) {
          console.log(err)
        }
      }
      fetchData();
    }
  , [])
  return (
    <section className="p-5">


      <BookForm books={books} setBooks={setBooks} />


      {books === null ? (
        <>
          <p className="text-sm text-center">
            Add Books to Display
          </p>
        </>
      ):(

        <Table>
        <TableCaption>
          List of books that you have
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">
              To Read
            </TableHead>
            <TableHead className="text-center">
              In Progress
            </TableHead>
            <TableHead className="text-center">
              Completed
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <BookRows books={books} setBooks={setBooks}/>
        </TableBody>
        </Table>
       )
      }
      
    </section>
  )
}


export default BooksTable