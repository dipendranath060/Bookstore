import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_CART } from '../../store/slices/cartSlice';

function Index() {
    const state = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();

    console.log(cart);

    const addToCart = async (book) => {
        console.log(book);
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/cart/add`, {
                book
            }, {
                headers: {
                    Authorization: `Bearer ${state?.access_token}`
                }
            });
            toast.success("Book added to cart");
            dispatch(UPDATE_CART(response.data.data?.items));
        } catch (err) {
            toast.error(err.message);
        }
    }
    const removeFromCart = async (book) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/cart/remove`, {
                book
            }, {
                headers: {
                    Authorization: `Bearer ${state?.access_token}`
                }
            });
            toast.success("Book removed from cart");
            dispatch(UPDATE_CART(response.data.data?.items));
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 mt-3">
                    <h3 className="text-center">Cart List</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">S.N</th>
                                <th scope="col">Image</th>
                                <th scope="col">Item</th>
                                <th scope="col">ISBN</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart?.length > 0 ? (cart.map((item, index) => (
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td><img src={`${process.env.REACT_APP_SERVER_URL}/${item?.book?.image}`} width={"50"} /></td>
                                        <td>{item?.book?.title}</td>
                                        <td>{item?.book?.isbn}</td>
                                        <td>{item?.quantity}</td>
                                        <td>
                                            <button className="btn btn-danger mx-1" onClick={() => removeFromCart(item?.book?._id)}>-</button>
                                            <button className="btn btn-success mx-1" onClick={() => addToCart(item?.book?._id)}>+</button>
                                        </td>
                                        <td>

                                        </td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td colSpan={7} className='text-center'>No Data Found</td>
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