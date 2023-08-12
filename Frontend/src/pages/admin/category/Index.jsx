import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function Index() {
    const [categories, setCategories] = useState([]);
    const fetchCategory = async function () {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/categories`);
            console.log(response.data.data)
            setCategories(response.data.data);
        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        fetchCategory()
    }, []);

    const handleDelete = async (id) => {
        try{
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/categories/${id}`);
            toast.success("Category Deleted");
            fetchCategory();
        }catch(err)
        {
            toast.error(err.message);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 mt-3">
                    <h3 className="text-center">Category List</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">S.N</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.length > 0 ? (categories.map((category, index) => (
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>{category.name}</td>
                                        <td>{category.status}</td>
                                        <td>
                                            <a className="btn btn-info mx-1" href="#">Edit</a>
                                            <button type="button" className="btn btn-danger mx-1" onClick={() => handleDelete(category._id)}>Delete</button>
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