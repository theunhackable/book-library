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

