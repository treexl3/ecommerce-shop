import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import Products from "./pages/Products/Products.jsx";
import Product from "./pages/Product/Product.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Success from './pages/Checkout/Success.jsx';
import Cancel from './pages/Checkout/Cancel.jsx';
import "./app.scss";

const Layout = () => {
    return (
        <div className="app">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/products/:id",
                element: <Products />
            },
            {
                path: "/product/:id",
                element: <Product />
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "checkout/success",
                element: <Success />
            },
            {
                path: "checkout/cancel",
                element: <Cancel />
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />
}

export default App;