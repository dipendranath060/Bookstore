import React, { useEffect, useState } from 'react'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

function Create() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        title: "",
        isbn: "",
        price: "",
        quantity: 0,
        image: "",
        category: ""
    });

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/categories`);
            setCategories(response.data.data.map((category) => {
                return {
                    value: category._id,
                    label: category.name
                }
            }));
            setData((data) => ({ ...data, category: response.data.data[0]?._id }))

        } catch (err) {
            toast.error(err.message);
        }
    }

    const handleChange = (e) => {
        let { name, value, type } = e.target;

        if (type === "file")
            value = e.target.files[0];

        setData({
            ...data,
            [name]: value
        })
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     console.log(data);

    //     try {
    //         const response = await axios.post("http://127.0.0.1:5000/api/v1/books", data);
    //         console.log(response.data);
    //         toast.success("Book Addded Successfully!!");
    //         navigate('/admin/book');
    //     } catch (err) {
    //         toast.error(err?.response?.data?.message ?? err.message);
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //form data
            const formData = new FormData();

            // convert data to form data
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
            // formData.append("title", data.title);
            // formData.append("isbn", data.isbn);
            // formData.append("price", data.price);


            // make request
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/books`, formData);
            console.log(response.data);
            toast.success("Book Addded Successfully!!");
            navigate('/admin/book');
        } catch (err) {
            toast.error(err?.response?.data?.message ?? err.message);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 mt-3">
                    <h3 className="text-center">Add Book</h3>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Book Name"
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter book name..."
                            value={data.title}
                            onChange={handleChange}
                        />

                        <Input
                            label="Book ISBN"
                            type="text"
                            id="isbn"
                            name="isbn"
                            placeholder="Enter book isbn..."
                            value={data.isbn}
                            onChange={handleChange}
                        />

                        <Select
                            label="Book Category"
                            name="category"
                            id="category"
                            value={data.category}
                            onChange={handleChange}
                            data={categories}
                        />

                        <Input
                            label="Book Quantity"
                            type="text"
                            id="quantity"
                            name="quantity"
                            placeholder="Enter book quantity..."
                            value={data.quantity}
                            onChange={handleChange}
                        />

                        <Input
                            label="Book Price"
                            type="text"
                            id="price"
                            name="price"
                            placeholder="Enter book price..."
                            value={data.price}
                            onChange={handleChange}
                        />

                        <Input
                            label="Book Image"
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleChange}
                        />

                        <button className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create