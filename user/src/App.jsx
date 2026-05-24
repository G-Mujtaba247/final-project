import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from "@/pages/Home"
import About from "@/pages/About"
import Contact from "@/pages/Contact"
import Tours from './pages/Tours'
import Terms from './pages/safety/Terms'
import Policies from './pages/safety/Policies'
import FAQ from './components/FAQ'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Booking from './pages/Booking'
import BookTour from './components/Bookings/BookTour'
import ProtectedRoute from './components/ProtectedRoute'
import Page from './pages/Page'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tours" element={<Tours />} />

        {/* Protected Booking Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/booking" element={<Booking />} />
          <Route path="/booktour" element={<BookTour />} />
        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Dynamic Pages */}
        <Route path="/:slug" element={<Page />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
