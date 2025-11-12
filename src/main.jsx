import React from "react";
import ReactDOM from "react-dom/client";
import CropDetails from "./CropDetails.jsx";
import App from './App.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import AuthProvider from "./AuthProvider.jsx";
import AddCrop from "./AddCrops.jsx";
import AllCrops from "./AllCrops.jsx";
import Home from "./Home.jsx"; 
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router";
import MyPosts from "./MyPost.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      { path: '/', element: <Home /> }, 
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      {
        path: '/secret',
        element: (
          <PrivateRoute>
            <h1 className="text-2xl text-green-700 text-center mt-20">
              Secret Protected Page
            </h1>
          </PrivateRoute>
        ),
      },
      {
        path: '/add-crop',
        element: (
          <PrivateRoute>
            <AddCrop />
          </PrivateRoute>
        ),
      },
      {
  path: "/my-posts",
  element: (
    <PrivateRoute>
      <MyPosts></MyPosts>
    </PrivateRoute>
  ),
},

      { path: '/all-crops', element: <AllCrops /> },
      {
  path: "/crops/:id",
  element: <CropDetails></CropDetails>,
},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
