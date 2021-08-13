import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

const Navbar: React.FC = () => {
  const router = useRouter();
  const isRouteActive = (r: string) => (r === router.pathname ? 'active' : '');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="logo">
          <Link href={`/`}>
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href={`/cart`}>
                <a
                  className={`nav-link ${isRouteActive('/cart')}`}
                  aria-current="page"
                  href="#">
                  <i aria-hidden className="fas fa-shopping-cart"></i>
                  Cart
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={`/signin`}>
                <a
                  className={`nav-link ${isRouteActive('/signin')}`}
                  aria-current="page"
                  href="#">
                  <i aria-hidden className="fas fa-user"></i>
                  Sign in
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
