import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../store/slices/authSlice';
import { UPDATE_CART } from '../store/slices/cartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

function Navbar() {
    const navigate = useNavigate();

    const state = useSelector(store => store.auth);
    const cart = useSelector(store => store.cart.cart);

    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/?q=${searchText}`);
    }

    const handleLogout = () => {
        dispatch(LOGOUT());
        navigate('/login');
    }

    const getCart = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/cart`, {
                headers: {
                    Authorization: `Bearer ${state?.access_token}`
                }
            });
            dispatch(UPDATE_CART(response.data.data?.items));
        } catch (err) {
            toast.error(err?.response?.data?.message ?? err.message);
        }
    }

    useEffect(() => {
        if(state?.user?.role === "guest")
            getCart();
    }, [state])

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Bookstore - {state.user.name ?? "Guest"}</Link>

                {(state.user?.role === "admin") &&
                    (<ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/category/create">Add Category</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/category">Category</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/book/create">Add Book</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/book">Book</Link>
                        </li>
                    </ul>)
                }

                {(state.user?.role === "guest") &&
                    (<ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart List - {cart?.length}</Link>
                        </li>
                    </ul>)
                }

                <form className="d-flex" role="search" onSubmit={handleSearch}>
                    <input className="form-control me-2" type="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <div>
                    {
                        (Object.keys(state.user).length > 0) ? (<button className="btn btn-outline-danger" type="button" onClick={handleLogout}>Logout</button>) : (<Link className="btn btn-outline-success" type="submit" to="/login">Login</Link>)
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar