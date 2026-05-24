
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import Dashboard from "@/pages/Dashboard"
import AdminLayout from "@/layout/AdminLayout"
import ToursPage from "@/pages/tours/index"
import BookingsPage from "@/pages/bookings/index"
import UsersPage from "@/pages/Users"

import Webpages from "@/pages/cms/Webpages"
import HomeEditor from "@/pages/cms/HomeEditor"
import Contact from "@/pages/cms/Contact"
import About from "@/pages/cms/About"
import Settings from "@/pages/Settings"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="tours" element={<ToursPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="settings" element={<Settings />} />

        {/* CMS Routes */}
        <Route path="cms" element={<Webpages />} />
        <Route path="cms/home" element={<HomeEditor />} />
        <Route path="cms/about" element={<About />} />
        <Route path="cms/contact" element={<Contact />} />
        <Route path="cms/*" element={<Webpages />} />


      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App

