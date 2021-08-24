import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import Cookie from 'js-cookie';

import { useGlobalState } from '../../context/GlobalState';

const Navbar: React.FC = () => {
  const router = useRouter();
  const isRouteActive = (r: string) => (r === router.pathname ? 'active' : '');

  const { state, dispatch } = useGlobalState();
  const { auth, cart } = state;

  const handleLogout = () => {
    Cookie.remove('refreshToken', { path: 'api/auth/accessToken' });
    localStorage.removeItem('firstLogin');
    dispatch({ type: 'AUTH', payload: {} });
    dispatch({ type: 'NOTIFY', payload: { success: 'Logout Successful' } });
    return router.push('/');
  };

  const loginRoutes = () =>
    auth && Object.keys(auth).length > 0 ? (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle d-flex flex-wrap gap-1 align-items-center"
          href="#"
          role="button"
          id="navbarDropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ padding: '0.3rem 0.2rem' }}>
          <Image
            className="avatar"
            src={auth.user.avatar}
            alt={auth.user.avatar}
            width="30"
            height="30"></Image>
          {auth.user.name}
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">
            Profile
          </a>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </ul>
      </li>
    ) : (
      <li className="nav-item">
        <Link href="/signin">
          <a
            className={`nav-link ${isRouteActive('/signin')}`}
            aria-current="page"
            href="#">
            <i aria-hidden className="fas fa-user"></i>
            Sign in
          </a>
        </Link>
      </li>
    );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="logo">
          <Link href="/">
            <a>
              <Image src="/logo.svg" alt="logo" width="50" height="50" />
            </a>
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown">
          <ul className="navbar-nav p-1">
            <li className="nav-item">
              <Link href="/cart">
                <a
                  className={`nav-link ${isRouteActive('/cart')}`}
                  aria-current="page"
                  href="#">
                  <i
                    aria-hidden
                    className="fas fa-shopping-cart position-relative">
                    <span className="cart-count position-absolute">
                      {cart?.length}
                    </span>
                  </i>
                  Cart
                </a>
              </Link>
            </li>
            {loginRoutes()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
