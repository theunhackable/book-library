export async function getBooksData() {
    try{

        const res = await fetch('http://127.0.0.1:8000/books');
        const books = await res.json();
        return books.data;
    }
    catch(err){
        console.log(err)
    }
    return null;
}

export const updateBook = async (book_id: number, new_status: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/books/${book_id}?new_status=${new_status}`, {
        method: 'PUT',
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

export const deleteBook = async (book_id: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/books/${book_id}`, {
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