
import { lazy, Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

const Login = lazy(() => import("@/pages/Login"))
const Signup = lazy(() => import("@/pages/Signup"))
const Dashboard = lazy(() => import("@/pages/Dashboard"))
const AdminLayout = lazy(() => import("@/layout/AdminLayout"))
const ToursPage = lazy(() => import("@/pages/tours/index"))
const BookingsPage = lazy(() => import("@/pages/bookings/index"))
const UsersPage = lazy(() => import("@/pages/Users"))
const Webpages = lazy(() => import("@/pages/cms/Webpages"))
const HomeEditor = lazy(() => import("@/pages/cms/HomeEditor"))
const Contact = lazy(() => import("@/pages/cms/Contact"))
const About = lazy(() => import("@/pages/cms/About"))
const Settings = lazy(() => import("@/pages/Settings"))

function App() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading page...</div>}>
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
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
