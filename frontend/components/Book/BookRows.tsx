"use client"
import { TableRow } from "../ui/table";
import ToReadRow from "./ToReadRow";
import InProgressRow from "./InProgressRow";
import CompletedRow from "./CompletedRow";



type BookRowsProps = {
  books: Book[] | null;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const BookRows = ({books, setBooks}: BookRowsProps) => {

  return (
    <>

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

