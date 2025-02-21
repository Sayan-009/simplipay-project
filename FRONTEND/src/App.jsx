import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Button } from "@/components/ui/button"
import { BrowserRouter, Routes, Route } from "react-router";
import SkeletonLoader from "./components/SkeletonLoader";
import { ToastProvider } from "./components/ToastContext";
const Home = React.lazy(() => import("./components/Home"))
const Landing = React.lazy(() => import("./components/Landing"))
const RegisterComponent = React.lazy(() => import("./components/RegisterComponent"))
const LoginComponent = React.lazy(() => import("./components/LoginComponent"))
const Footer = React.lazy(() => import("./components/Footer"))
const NotFoundPage = React.lazy(() => import("./components/ui/NotFoundPage"));
const ServerErrorPage = React.lazy(() => import("./components/ui/ServerErrorPage"));
const MoneySlider = React.lazy(() => import("./components/MoneySlider"))



export default function App() {
  return (
    <div>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Suspense fallback={<SkeletonLoader />}><Landing /></Suspense>} />
            <Route path="/home" element={<Suspense fallback={<SkeletonLoader />}><Home /></Suspense>} />
            <Route path="/register" element={<Suspense fallback={<SkeletonLoader />}><RegisterComponent /></ Suspense>} />
            <Route path="/login" element={<Suspense fallback={<SkeletonLoader />}><LoginComponent /></ Suspense>} />
            <Route path="/add-money" element={<Suspense fallback={<SkeletonLoader />}><MoneySlider /></Suspense>} />
            <Route path="/500" element={<ServerErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>

      <Footer />
    </div>
  )
}


