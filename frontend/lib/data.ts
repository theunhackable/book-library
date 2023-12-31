const URL = 'http://127.0.0.1:8000'


export const getBooksData = async () => {
  try {

    const res = await fetch(`${URL}/books`);
    const books = await res.json();
    if(books.data)
      return books.data;
  } catch (err) {
    console.log(err)
  }
  return null;
}

export const addBook = async (bookName: string) => {
  const res = await fetch(`${URL}/books`, {
    method: 'POST',
    body: JSON.stringify({
      book_name: bookName
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  const data = await res.json();
  console.log(data)
  if(data.data) return data.data

  return data.message;
}


export const updateBook = async (book_id: number, book: Book) => {
  try {
    const res = await fetch(`${URL}/books/${book_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    });

    const newBook = await res.json();
    return newBook;
  } catch (err) {
    console.log(err)
    return null;
  }

}

export const deleteBook = async (book_id: number) => {
  try {
    const res = await fetch(`${URL}/books/${book_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const book = await res.json();
    return book;
  } catch (err) {
    console.log(err)
    return null;
  }
}
