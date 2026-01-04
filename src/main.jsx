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
import DashboardLayout from "./DashboardLayout.jsx";
import Dashboard from "./Dashboard.jsx";
import About from "./About.jsx";
import Privacy from "./Privacy.jsx";


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
      { path: "/all-crops", element: <AllCrops /> },
      { path: "crops/:id", element: <CropDetails /> },
      {path: '/about', element: <About></About>},
      {path: '/privacy', element: <Privacy></Privacy>},
      {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
          { index: true, element: <Dashboard /> },       // default dashboard page
          { path: "my-interests", element: <MyInterests /> },
          { path: "my-crops", element: <MyCrops /> },
          { path: "my-profile", element: <MyProfile /> },
          { path: "my-posts", element: <MyPosts /> },
          {
            path: 'add-crop',
            element: 
                <AddCrop></AddCrop>
            
          },
          // যদি চাই PrivateRoute আর child route মিলিয়ে
        ]
      }
      ,
      
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
