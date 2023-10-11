"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

type BookFormProps = {
  books: Book[] | null;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const BookForm = ({books, setBooks}: BookFormProps) => {

    const [bookName, setBookName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBookName(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        try {

          const res = await fetch('http://127.0.0.1:8000/books', {
                method: 'POST',
                body: JSON.stringify({
                    book_name: bookName
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if(data.data) {
                setBooks(prev => {
                    if (prev) {
                        return [...prev, data.data]
                    }
                    return [data.data]
                })
              setBookName('');

            } else {
                alert(data.message)
            }


        } catch (err) {
            console.log(err)
        }
        setLoading(false);
    }

  return (
    <section className='p-5 flex flex-col items-center text-center justify-center gap-2'>
      <h1 className='text-md font-bold'>Book Form</h1>
      <Label className='' htmlFor='book-input'>
        Book Name: 
      </Label>
        <Input onChange={handleChange} placeholder='Eg: Pursuit of Happiness' value={bookName} className='border-black w-fit' id='book-input' required></Input>
        <Button onClick={handleSubmit} disabled={loading || bookName.length === 0}> Add Book </Button>
    </section>

  )
}

export default BookForm