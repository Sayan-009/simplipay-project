import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { useToast } from "../ToastContext";
import Loader from "../Loader";

export default function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const { showToast } = useToast();


  const avatarFile = watch("avatar");

  const onSubmit = async (data) => {
    setIsRegistering(true);
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (avatarFile && avatarFile.length > 0) {
        formData.append("avatar", avatarFile[0]); // Attach the file
      }

      const response = await axios.post("http://localhost:5000/api/v1/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/login");
      showToast(response.data.message, "success")
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
    } finally {
      setIsRegistering(false)
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-9 mb-9 p-5 bg-white dark:bg-gray-900 shadow-md rounded-xl">
      {
        isRegistering && <Loader message={"Registering..."} />
      }
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Register
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            {...register("fullName", { required: "Full Name is required" })}
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

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

        {/* Avatar Upload */}
        <div>
          <Label htmlFor="avatar">Avatar</Label>
          <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} {...register("avatar", { required: "image is required" })} />
          {avatarPreview && <img src={avatarPreview} alt="Avatar Preview" className="mt-2 w-20 h-20 rounded-full object-cover" />}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isRegistering} >{isRegistering ? "Registering..." : "Register"}</Button>
        <div className="p-1 text-center">
          <p className="text-gray-700">Already have an account? <Link to="/login" className="underline">Login</Link></p>
        </div>
      </form>
    </div>
  );
}
