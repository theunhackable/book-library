"use client"
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { MouseEvent, use, useEffect, useState } from "react";
import ToReadRow from "./ToReadRow";
import InProgressRow from "./InProgressRow";
import CompletedRow from "./CompletedRow";



type BookRowsProps = {
  books: Book[] | null;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const BookRows = ({books, setBooks}: BookRowsProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      {loading ? <div className="bg-slate-200 h-full w-full">Loading...</div> : <></>}

      {books?.map((book: Book) => (

        <TableRow key={book.book_id} className="max-w-[700px]">
          
          <ToReadRow book={book} books={books} setBooks={setBooks}  />
          <InProgressRow book={book} books={books} setBooks={setBooks}  />
          <CompletedRow book={book} books={books} setBooks={setBooks}  />

        </TableRow>

      )
      )}
    </>
  )


}

export default BookRows

