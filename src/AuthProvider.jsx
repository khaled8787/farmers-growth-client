import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebase.config";
import { useNavigate } from "react-router";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
    .then(res => {
      const loggedUser = { email: res.user.email };
       fetch("https://farmer-growth-server.vercel.app/auth/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loggedUser)
      })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("krishilink-token", data.token);
      });
      return res;
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
    .then(res => {
      const loggedUser = { email: res.user.email };
       fetch("https://farmer-growth-server.vercel.app/auth/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loggedUser)
      })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("krishilink-token", data.token);
      });
      return res;
    });
  };

  const googleLogin = () => {
  setLoading(true);
  return signInWithPopup(auth, googleProvider)
    .then((result) => {
      setUser(result.user);
      setLoading(false);
      return result.user;
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    });
};



   const logOut = () => {
    setLoading(true);
    setUser(null);
    localStorage.removeItem("user");
    return signOut(auth);
  };

   const loginUser = (data) => setUser(data);
  const logoutUser = () => setUser(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);



   const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleLogin,
    logOut,
    loginUser,
    logoutUser,
    setUser
  };


  return (
    <AuthContext.Provider value={ {...authInfo} }>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;