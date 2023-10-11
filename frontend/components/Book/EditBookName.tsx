import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { updateBook } from "@/lib/data"

type EditBookName = {
  book: Book,
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>,
  setEdit: React.Dispatch<React.SetStateAction<boolean>>

}
const EditBookName = ({book, setBooks, setEdit}: EditBookName) => {
  const [newName, setNewName] = useState(book.book_name)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value)
  }
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    
    const newBook = {...book, book_name: newName}
    const res = await updateBook(book.book_id, newBook)
    if(res) {
      setBooks(prevBooks => {
        const newBooks = prevBooks.map( (book: Book) => {
          if(book.book_id === newBook.book_id) {
            return {
              ...book,
              book_name: newName
            }
          }
          return book
        });
        return newBooks
      })
      setEdit(false)
    }
    else alert("Error updating book name")
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <Label>Enter New Name</Label>
      <Input className="w-fit align-center " onChange={handleChange} placeholder="eg: YavaScript" value={newName}></Input>
      <Button onClick={handleSubmit} > Submit Changes </Button>
    </div>
  )
}

export default EditBookName