import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function Index() {
    const [books, setBooks] = useState([]);
    const fetchBook = async function () {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/books`);
            console.log(response.data.data)
            setBooks(response.data.data);
        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        fetchBook()
    }, []);

    const handleDelete = async (id) => {
        try{
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/books/${id}`);
            toast.success("Book Deleted");
            fetchBook();
        }catch(err)
        {
            toast.error(err.message);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 mt-3">
                    <h3 className="text-center">Book List</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">S.N</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">ISBN</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.length > 0 ? (books.map((book, index) => (
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td><img src={`${process.env.REACT_APP_SERVER_URL}/${book.image}`} width={50} /></td>
                                        <td>{book.title}</td>
                                        <td>{book.isbn}</td>
                                        <td>{book.price}</td>
                                        <td>
                                            <a className="btn btn-info mx-1" href="#">Edit</a>
                                            <button type="button" className="btn btn-danger mx-1" onClick={() => handleDelete(book._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td colSpan={4} className='text-center'>No Data Found</td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Index