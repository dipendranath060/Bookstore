import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./layouts/App";
import Register from "./pages/Register";
import Login from "./pages/Login";

import CategoryIndex from "./pages/admin/category/Index";
import CategoryCreate from "./pages/admin/category/Create";
import CategoryEdit from "./pages/admin/category/Edit";

import BookIndex from "./pages/admin/book/Index";
import BookCreate from "./pages/admin/book/Create";
import BookEdit from "./pages/admin/book/Edit";

import CartIndex from "./pages/user/Cart";

import ProtectedAdmin from "./layouts/ProtectedAdmin";
import ProtectedUser from "./layouts/ProtectedUser";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                element: <ProtectedUser />,
                children: [
                    {
                        path: "/cart",
                        element: <CartIndex />
                    }
                ]
            },
            {
                path: "/admin",
                element: <ProtectedAdmin />,
                children: [
                    {
                        path: "category",
                        element: <CategoryIndex />
                    },
                    {
                        path: "category/create",
                        element: <CategoryCreate />
                    },
                    {
                        path: "category/edit",
                        element: <CategoryEdit />
                    },
                    {
                        path: "book",
                        element: <BookIndex />
                    },
                    {
                        path: "book/create",
                        element: <BookCreate />
                    },
                    {
                        path: "book/edit",
                        element: <BookEdit />
                    },
                ]
            }
        ]
    }
]);

export default router;