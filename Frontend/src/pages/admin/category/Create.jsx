import React, { useState } from 'react'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

function Create() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        status: "active"
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/categories`, data);
            console.log(response.data);
            toast.success("Category Addded Successfully!!");
            navigate('/admin/category');
        }catch(err)
        {
            toast.error(err.message);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 mt-3">
                    <h3 className="text-center">Add Category</h3>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Category Name"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter category name..."
                            value={data.name}
                            onChange={handleChange}
                        />

                        <Select
                            label="Category Status"
                            name="status"
                            id="status"
                            value={data.status}
                            onChange={handleChange}
                            data={[
                                { value: "active", label: "Active" },
                                { value: "inactive", label: "Inactive" }
                            ]}
                        />
                        <button className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create