"use client"

import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Index from "./pages/Index"
import Dashboard from "./pages/Dashboard"
import Appointments from "./pages/Appointments"
import Patients from "./pages/Patients"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"
import Examinations from "./pages/Examinations"
import NewExamination from "./pages/new-examination"
import Clinics from "./pages/Clinic"
import UserManagement from "./pages/UserManagement"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" closeButton />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clinics" element={<Clinics />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/appointments/new" element={<Appointments />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/:id" element={<Patients />} />
            <Route path="/examinations" element={<Examinations />} />
            <Route path="/examinations/:id" element={<Examinations />} />
            <Route path="/examinations/new" element={<NewExamination />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App