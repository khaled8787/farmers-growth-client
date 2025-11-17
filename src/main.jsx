import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import AuthProvider, { AuthContext } from "./AuthProvider.jsx";
import AddCrop from "./AddCrops.jsx";
import AllCrops from "./AllCrops.jsx";
import Home from "./Home.jsx";
import MyProfile from "./MyProfile";
import MyCrops from "./MyCrops";
import MyPosts from "./MyPost.jsx";
import MyInterests from "./MyInterest.jsx";
import CropDetails from "./CropDetails.jsx";
import NotFound from "./NotFound.jsx";
import "./index.css";


const AddCropWrapper = () => {
  const { user } = useContext(AuthContext); 
  
  if (!user) return <p className="text-center mt-10 text-xl">Loading user info...</p>; 
  
  return (
    <AddCrop
      currentUserEmail={user.email}     
      currentUserName={user.displayName} 
    />
  );
};

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
            <AddCropWrapper /> 
          </PrivateRoute>
        ),
      },
      { path: "/my-posts", element: <PrivateRoute><MyPosts /></PrivateRoute> },
      { path: "/all-crops", element: <AllCrops /> },
      { path: "/my-interests", element: <MyInterests /> },
      { path: "/my-crops", element: <MyCrops /> },
      { path: "/my-profile", element: <MyProfile /> },
      { path: "/crops/:id", element: <PrivateRoute><CropDetails /></PrivateRoute> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
