import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:5000/api/v1/users/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data);
      setError(""); 
    } catch (error) {
        if (error.response) {
            setError(error.response)
            if (error.response.status >= 400 && error.response.status < 500) {
              showToast(error.response?.data?.message, "error")
            }
            if (error.response.status >= 500) {
              navigate("/500")
            }
            console.error("Error:", error.response?.data || error.message);
          } else if (error.request) {
            showToast(error.request)
    
          } else {
            showToast(error.message, "error")
          }
        }
    }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <DataContext.Provider value={{ user, fetchUser, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
