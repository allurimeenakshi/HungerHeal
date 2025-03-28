import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import RootLayout from './RootLayout';
import Feedback from "./components/feedback/Feedback.jsx";
import DonateFood from "./components/donate-food/DonateFood.jsx";
import RequestFood from "./components/request-food/RequestFood.jsx";
import UserProfile from "./components/user-profile/UserProfile.jsx";
import Track from './components/track/track.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import Auth from "./components/register/Auth.jsx";
import "./App.css";

// Dummy RoutingError component (Replace with actual error page)
const RoutingError = () => <h2>404 - Page Not Found</h2>;

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
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
        { path: "/user-profile", element: <UserProfile /> },
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
