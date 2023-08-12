import React, { useContext, useState } from 'react'
import Input from '../components/Input'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../store/slices/authSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login`, data);
            console.log(response.data.data);
            dispatch(
                LOGIN({
                    access_token: response.data.data.access_token,
                    user: response.data.data.user
                })
            )
            toast.success("Logged in Successfully!!");
            (response.data.data?.user?.role == "admin")? 
                navigate("/admin/book") 
                : 
                navigate("/");
        } catch (err) {
            toast.error(err?.response?.data?.message ?? err.message);
        }
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center" style={{ "height": "90vh" }}>
                <div className="row w-100 justify-content-center">
                    <div className="col-6 p-5 shadow">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-center">Login</h2>
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                id="email"
                                value={data.email}
                                onChange={handleChange}
                                placeholder="Enter email..."
                            />

                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                id="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="Enter password..."
                            />

                            <button className="btn btn-primary">Login</button>
                            <Link className="btn btn-success ms-1" to="/register">Register</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login