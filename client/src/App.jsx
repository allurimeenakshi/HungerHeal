import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Feedback from "./components/feedback/Feedback.jsx";
import DonateFood from "./components/donate-food/DonateFood.jsx";
import RequestFood from "./components/request-food/RequestFood.jsx";
import Track from "./components/track/Track.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import Auth from "./components/register/Auth.jsx";
import "./App.css";

// Dummy RoutingError component (Replace with actual error page)
const RoutingError = () => <h2>404 - Page Not Found</h2>;

// Layout component merged into App.jsx
const Layout = () => {
  return (
    <div>
      <Header />
      <div style={{ minHeight: "80vh" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Replacing RootLayout with Layout
      errorElement: <RoutingError />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/request-food", element: <RequestFood /> },
        { path: "/donate-food", element: <DonateFood /> },
        { path: "/feedback", element: <Feedback /> },
        { path: "/track", element: <Track /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/auth", element: <Auth /> },
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
