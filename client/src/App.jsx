import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import RootLayout from './RootLayout';
import About from "./components/about/about.jsx";
import Feedback from "./components/feedback/Feedback.jsx"
import DonateFood from "./components/donate-food/DonateFood.jsx"
import RequestFood from "./components/request-food/RequestFood.jsx"
import Track from './components/track/track.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import Auth from './components/auth/Auth.jsx';

import "./App.css"



// Dummy RoutingError component (Replace with actual error page)
const RoutingError = () => <h2>404 - Page Not Found</h2>;

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />, // Ensure RootLayout exists
      errorElement: <RoutingError />, // Ensure RoutingError exists
      children: [
        {
          path: '/',
          element: <Home />, // Ensure Home component exists
        },
        {
          path: '/about',
          element: <About />, // Ensure Home component exists
        },
        {
          path: '/request-food',
          element: <RequestFood />,
        },
        {
          path: '/donate-food',
          element: <DonateFood />,
        },
        {
          path: '/feedback',
          element: <Feedback />,
        },
        {
          path: '/track',
          element: <Track />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/auth',
          element: <Auth />,
        }
      ],
    },
  ]);

  return (
    <div className="main">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
