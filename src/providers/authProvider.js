import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../contexts/authContext';
import AxiosInstance from '../axiosinstance';
import jwtDecode from "jwt-decode";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken"); 
    console.log("cookies", document.cookie);    
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      let clientData, cartData;
      const loggedInUser = async () => {
        const { data } = await AxiosInstance.get(`/api/v1/users/showMe`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });
        cartData = await AxiosInstance.get("/api/v1/cart/cartCount", {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });
        if (cartData?.data?.cartCount != 0) {
          clientData = await AxiosInstance.get(`/api/v1/cart/user`, {
            headers: {
              "Authorization": `Bearer ${accessToken}`
            }
          });
          console.log("clientSecret", clientData?.data?.paymentIntent?.client_secret)
        }        
        console.log("loggedInUser", {
          userData: data?.user,
          decodedToken,
          cartData: cartData?.data?.cartCount,          
        });
        AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        setUser(data?.user);
        setClientSecret(clientData?.data?.paymentIntent?.client_secret);
        setCartCount(cartData?.data?.cartCount);
        setIsLoggedIn(true);
      }
      loggedInUser();
    }
  }, []);

  const register = async (name, email, password, address, long, lat) => {
    try {
      console.log("regUser", { name, email, password, address, long, lat });
      const { data } = await AxiosInstance.post(`/api/v1/auth/register`, { name, email, password, address, long, lat });
      return data;
    } catch (error) {
      console.log("Error", error);
    }
  }

  const login = async (email, password) => {
    try {
      const { data, headers } = await AxiosInstance.post(`/api/v1/auth/login`, { email, password });      
      const decodedToken = jwtDecode(data?.tokens?.accessToken);
      setUser(decodedToken.user);
      localStorage.setItem("accessToken", data?.tokens?.accessToken);
      localStorage.setItem("refreshToken", data?.tokens?.refreshToken);
      setIsLoggedIn(true);
      AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data?.tokens?.accessToken}`;
      return data;
    } catch (error) {
      console.log("Error", error);
    }
  }

  const logout = async () => {
    try {
      const { data } = await AxiosInstance.delete("/api/v1/auth/logout");
      console.log("logout", data);
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      AxiosInstance.defaults.headers.common["Authorization"] = ``;
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error", error);
    }
  }

  const verifyEmail = async (verificationToken, email) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        const { data } = await AxiosInstance.post('/api/v1/auth/verify-email', {
          verificationToken,
          email,
        });
        return data;
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  const forgotPassword = async (email) => {
    try {
      const { data } = await AxiosInstance.post('/api/v1/auth/forgot-password', {
        email,
      });
      return data;
    } catch (error) {
      console.log("Error", error);
    }
  }

  const resetPassword = async (password, token, email) => {
    try {
      const { data } = await AxiosInstance.post('/api/v1/auth/reset-password', {
        password,
        token,
        email,
      });
      return data;
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        clientSecret,
        cartCount,
        isLoggedIn,
        register,
        login,
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
