import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
	const navigate = useNavigate();
	const [data, setData] = useState({
		name: "",
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
			await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/register`, data);
			toast.success("Registered Successfully!!");
			navigate('/login');
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
							<h2 className="text-center">Register</h2>
							<Input
								label="Name"
								type="text"
								name="name"
								id="name"
								value={data.name}
								onChange={handleChange}
								placeholder="Enter name..."
							/>

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


							<button className="btn btn-success mx-1">Register</button>
							<Link className="btn btn-secondary mx-1" to="/login">Login</Link>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register