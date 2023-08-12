import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { UPDATE_CART } from '../store/slices/cartSlice';

function BookCard(props) {
    const state = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const addToCart = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/cart/add`, {
                book: props._id
            }, {
                headers: {
                    Authorization: `Bearer ${state?.access_token}`
                }
            });

            dispatch(UPDATE_CART(response.data.data?.items));
            toast.success("Book added to cart");
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <div className="card">
            <img src={props.image} className="card-img-top" alt="..." />
            <div className="card-body">
                <p className="card-text">
                    <h5>{props.title}</h5>
                    <h6>Category: {props.category?.name}</h6>
                    <h6>ISBN: {props.isbn} | Price: Rs.{props.price}</h6>
                </p>
                {
                    state?.user?.role == "guest" && (<button className='btn btn-success w-100' onClick={addToCart}>Add to Cart</button>)
                }
            </div>
        </div>
    )
}

export default BookCard