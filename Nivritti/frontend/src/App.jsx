import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import MicroLending from './pages/MicroLending';
import CommunitySavings from './pages/CommunitySavings';
import LocalJobs from './pages/LocalJobs';
import Literacy from './pages/Literacy';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import UserDashboard from './pages/UserDashboard';
import BusinessDashboard from './pages/BusinessDashboard';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import EmailTest from './components/test/EmailTest';
import PrivateRoute from './components/auth/PrivateRoute';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import LoanRequestForm from './pages/LoanRequestForm';
import LoanRequestSuccess from './pages/LoanRequestSuccess';
import CommunityFunds from './components/community/CommunityFunds';
import FundDetails from './components/community/FundDetails';
import FundManagement from './components/admin/FundManagement';
import FundBorrow from './components/community/FundBorrow';
import JobDetails from './pages/JobDetails';
import JobManagement from './pages/JobManagement';
import JobSearch from './pages/JobSearch';
import JobApplicationSuccess from './pages/JobApplicationSuccess';
import TrainingDashboard from './pages/TrainingDashboard';
import Assessment from './pages/Assessment';
import CourseDetail from './pages/CourseDetail';
import CourseCatalog from './pages/CourseCatalog';
import SkillDetails from './pages/SkillDetails';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/micro-lending" element={<MicroLending />} />
                  <Route path="/community-savings" element={<CommunitySavings />} />
                  <Route path="/local-jobs" element={<LocalJobs />} />
                  <Route path="/jobs" element={<JobSearch />} />
                  <Route path="/jobs/:id" element={<JobDetails />} />
                  <Route path="/literacy" element={<Literacy />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/verify-email/:token" element={<VerifyEmail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/test/email" element={<EmailTest />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />

                  {/* Protected Routes */}
                  <Route path="/user/dashboard" element={
                    <PrivateRoute roles={['user']}>
                      <UserDashboard />
                    </PrivateRoute>
                  } />
                  <Route path="/business/dashboard" element={
                    <PrivateRoute roles={['business']}>
                      <BusinessDashboard />
                    </PrivateRoute>
                  } />
                  <Route path="/admin/dashboard" element={
                    <PrivateRoute roles={['admin']}>
                      <AdminDashboard />
                    </PrivateRoute>
                  } />
                  <Route path="/job-seeker/dashboard" element={
                    <PrivateRoute roles={['user']}>
                      <JobSeekerDashboard />
                    </PrivateRoute>
                  } />
                  <Route path="/request-loan" element={
                    <PrivateRoute roles={['user']}>
                      <LoanRequestForm />
                    </PrivateRoute>
                  } />
                  <Route path="/loan-request/success" element={
                    <PrivateRoute roles={['user']}>
                      <LoanRequestSuccess />
                    </PrivateRoute>
                  } />
                  <Route path="/job-application/success" element={
                    <PrivateRoute roles={['user']}>
                      <JobApplicationSuccess />
                    </PrivateRoute>
                  } />

                  {/* Community Fund Routes */}
                  <Route path="/community/funds" element={
                    <PrivateRoute roles={['user', 'business']}>
                      <CommunityFunds />
                    </PrivateRoute>
                  } />
                  <Route path="/community/funds/create" element={
                    <PrivateRoute roles={['user', 'business']}>
                      <CommunityFunds />
                    </PrivateRoute>
                  } />
                  <Route path="/community/funds/:id" element={
                    <PrivateRoute roles={['user', 'business']}>
                      <FundDetails />
                    </PrivateRoute>
                  } />
                  <Route path="/community/funds/:id/borrow" element={
                    <PrivateRoute roles={['user', 'business']}>
                      <FundBorrow />
                    </PrivateRoute>
                  } />
                  <Route path="/admin/funds" element={
                    <PrivateRoute roles={['admin']}>
                      <CommunityFunds />
                    </PrivateRoute>
                  } />
                  <Route path="/admin/funds/:id" element={
                    <PrivateRoute roles={['admin']}>
                      <FundDetails />
                    </PrivateRoute>
                  } />

                  {/* Admin Fund Management */}
                  <Route path="/admin/funds/manage" element={
                    <PrivateRoute roles={['admin']}>
                      <FundManagement />
                    </PrivateRoute>
                  } />

                  <Route path="/business/jobs" element={
                    <PrivateRoute roles={['business']}>
                      <JobManagement />
                    </PrivateRoute>
                  } />

                  {/* Training Routes */}
                  <Route path="/training" element={<TrainingDashboard />} />
                  <Route path="/training/assessment" element={<Assessment />} />
                  <Route path="/training/courses/:id" element={<CourseDetail />} />
                  <Route path="/training/catalog" element={<CourseCatalog />} />
                  <Route path="/training/:category/:skillId" element={<SkillDetails />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
