import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../ToastContext";
import { useState } from "react";
import Loader from "../Loader";


export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {showToast} = useToast();

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await axios.post("http://localhost:5000/api/v1/users/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      showToast("login successfull", "success");
      navigate('/home')
      // alert("login successful!");
    } catch (error) {
      if (error.response) {
        if (error.response.status >= 400) {
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
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-md rounded-xl">
      {
        isLoading && <Loader message={"Logining..."} />
      }
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Login
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">Login</Button>

        <div className="p-1 text-center">
          <p className="text-gray-700">Don't have an account? <Link to="/register" className="underline">Register</Link></p>
        </div>
      </form>
    </div>
  );
}
