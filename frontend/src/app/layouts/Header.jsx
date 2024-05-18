import React from 'react';
import { Link } from 'react-router-dom';
import { currentUser } from '../../helpers/current_user_helper';
import { fetchData } from '../../helpers/fetch_helper';
import { USER_URL } from '../../utils/app_constants';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const Header = () => {
  const user = currentUser();
  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to Sign out?')) {
      await fetchData(`${USER_URL}/signout`, 'delete');
      localStorage.clear();
      window.location.reload();
    }
  };
  return (
    <Navbar bg='light' expand='lg'>
      <Container fluid>
        <Navbar.Brand>
          <Link className='navbar-brand' to={'/'}>
            Patient DB({user.user_email})
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar' />
        <Navbar.Collapse id='navbar'>
          <Nav className='me-auto my-2 my-lg-0' navbar>
            <Link className='nav-link' to={'/'}>
              Home
            </Link>
            {user.role !== 'patient' && (
              <Link className='nav-link' to={'/admissions/create'}>
                Create Admission
              </Link>
            )}
            {user.role === 'admin' && (
              <Link className='nav-link' to={'/logs'}>
                Logs
              </Link>
            )}
            <button className='nav-link btn btn-light p-2' onClick={() => handleLogout()}>
              Sign Out
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
