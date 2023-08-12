import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

function Home() {
    const [books, setBooks] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const fetchBooks = async () => {
        const search = searchParams.get('q') ? `?q=${searchParams.get('q')}` : '';
        console.log(search);
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/books${ search }`);
            setBooks(response.data.data);
        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => { fetchBooks() }, [searchParams]);

    return (
        <div className="container">
            <h1 className="text-center mt-3">Our Books</h1>
            <div className="row my-3" data-masonry={{ "percentPosition": true }}>
                {
                    books.length ? (books.map(book => (
                        <div className="col-3 my-3">
                            <BookCard
                                _id={book._id}
                                title={book.title}
                                category={book.category}
                                isbn={book.isbn}
                                price={book.price}
                                image={`${process.env.REACT_APP_SERVER_URL}/${book.image}`}
                            />
                        </div>
                    ))) : (<h3 className="text-center">No Books Found</h3>)
                }
            </div>
        </div>
    )
}

export default Home