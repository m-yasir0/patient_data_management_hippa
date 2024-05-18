import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import Index from './app/pages/dashboard/Index';
import AdmissionIndex from './app/pages/admission/Index';
import { Header } from './app/layouts/Header';
import Login from './app/pages/user/Login';
import LogedInCheck from './app/components/LogedInCheck';
import Signup from './app/pages/user/Signup';
import AuthenticatedRoute from './app/components/AuthenticatedRoute';
import { ToastContainer } from 'react-toastify';
import { currentUser } from './helpers/current_user_helper';
import E_404 from './app/pages/error/E_404';
import Show from './app/pages/admission/Show';
import CreateAdmission from './app/pages/admission/CreateAdmission';
import EditAdmission from './app/pages/admission/EditAdmission';
import Logs from './app/pages/dashboard/Logs';

function App() {
  const user = currentUser();
  return (
    <Router>
      {currentUser()?.user_email && <Header />}
      <ToastContainer autoClose={3000} />
      <div className='container'>
        <Routes>
          <Route
            exact
            path='/login'
            element={
              <LogedInCheck>
                <Login />
              </LogedInCheck>
            }
          />
          <Route
            exact
            path='/signup'
            element={
              <LogedInCheck>
                <Signup />
              </LogedInCheck>
            }
          />
          {user.role === 'admin' && (
            <Route
              exact
              path='/logs'
              element={
                <AuthenticatedRoute>
                  <Logs />
                </AuthenticatedRoute>
              }
            />
          )}
          <Route
            exact
            path='/'
            element={
              <AuthenticatedRoute>
                <Index />
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path='/admissions'
            element={
              <AuthenticatedRoute>
                <AdmissionIndex />
              </AuthenticatedRoute>
            }
          >
            <Route
              exact
              path=''
              element={
                <AuthenticatedRoute>
                  <Index />
                </AuthenticatedRoute>
              }
            />
            <Route
              exact
              path=':id/show'
              element={
                <AuthenticatedRoute>
                  <Show />
                </AuthenticatedRoute>
              }
            />
            <Route
              exact
              path='create'
              element={
                <AuthenticatedRoute>
                  <CreateAdmission />
                </AuthenticatedRoute>
              }
            />
            <Route
              exact
              path=':id/edit'
              element={
                <AuthenticatedRoute>
                  <EditAdmission />
                </AuthenticatedRoute>
              }
            />
          </Route>
          <Route path='*' element={<E_404 />} />
          <Route path='/404' element={<E_404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
