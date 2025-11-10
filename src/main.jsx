import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import PrivateRoute from './PrivateRoute.jsx'
import AuthProvider from "./AuthProvider.jsx";
import './index.css'
import AddCrop from "./AddCrops.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
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
       path: "/add-crop",
       element: (
         <PrivateRoute>
          <AddCrop></AddCrop>
          </PrivateRoute>
  ),
},

    ],
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
