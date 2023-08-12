import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './store';

function App() {
    return (
        <React.Fragment>
            <Provider store={store}>
                <RouterProvider router={router} />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Provider>
        </React.Fragment>
    )
}

export default App