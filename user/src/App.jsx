import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from "react-router"
import ScrollToTop from "./components/ScrollToTop"

const Home = lazy(() => import("@/pages/Home"))
const About = lazy(() => import("@/pages/About"))
const Contact = lazy(() => import("@/pages/Contact"))
const Tours = lazy(() => import("./pages/Tours"))
const TourDetails = lazy(() => import("./pages/TourDetails"))
const Terms = lazy(() => import("./pages/safety/Terms"))
const Policies = lazy(() => import("./pages/safety/Policies"))
const FAQ = lazy(() => import("./components/FAQ"))
const Login = lazy(() => import("./pages/Auth/Login"))
const SignUp = lazy(() => import("./pages/Auth/SignUp"))
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"))
const Booking = lazy(() => import("./pages/Booking"))
const BookTour = lazy(() => import("./components/Bookings/BookTour"))
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"))
const Page = lazy(() => import("./pages/Page"))
const Profile = lazy(() => import("./pages/Profile"))

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="p-8 text-center">Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:slug" element={<TourDetails />} />

          {/* Protected Booking Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/booking" element={<Booking />} />
            <Route path="/booktour" element={<BookTour />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/contact" element={<Contact />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Dynamic Pages */}
          <Route path="/:slug" element={<Page />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
