import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/admin/AdminLayout";

function App() {

  const Login = lazy(() => import("./pages/Login"));
  const Register = lazy(() => import("./pages/Register"));
  const Dashboard = lazy(() => import("./pages/Dashboard"));
  const Observation = lazy(() => import("./pages/Observations"));
  const ObservationForm = lazy(() => import("./pages/ObservationForm"));
  const Category = lazy(() => import("./pages/admin/Category"));

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/observations" element={
            <ProtectedRoute>
              <Layout>
                <Observation />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/observations/create" element={
            <ProtectedRoute>
              <Layout>
                <ObservationForm />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/category" element={
            <ProtectedRoute>
              <AdminLayout>
                <Category />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
