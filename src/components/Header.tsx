'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FaHome,
  FaUsers,
  FaClipboardList,
  FaChartLine,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt
} from 'react-icons/fa';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Hide header on /login or /register
  if (pathname === '/login' || pathname === '/register' || pathname === '/') {
    return null;
  }

  const navLinkClass =
    'text-gray-800 hover:text-blue-600 flex flex-col items-center group relative';

  const spanClass =
    'text-sm absolute top-full mt-1 hidden group-hover:block bg-white text-black px-2 py-1 rounded shadow-md transition-opacity duration-300 z-10';

  return (
    <header className="fixed top-0 left-0 w-full bg-gray/60 backdrop-blur-md shadow-md z-10">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex flex-wrap justify-center items-center gap-4 sm:gap-6">
        {pathname === '/myposts' ? (
          user && (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium flex flex-col items-center group relative"
            >
              <FaSignOutAlt className="text-2xl" />
              <span className={spanClass}>Logout</span>
            </button>
          )
        ) : (
          <>
            <Link href="/users" className={navLinkClass}>
              <FaUsers className="text-2xl" />
              <span className={spanClass}>Users</span>
            </Link>
            <Link href="/posts" className={navLinkClass}>
              <FaClipboardList className="text-2xl" />
              <span className={spanClass}>Posts</span>
            </Link>
            <Link href="/chart" className={navLinkClass}>
              <FaChartLine className="text-2xl" />
              <span className={spanClass}>Chart</span>
            </Link>
            <Link href="/login" className={navLinkClass}>
              <FaSignInAlt className="text-2xl" />
              <span className={spanClass}>Login</span>
            </Link>
            <Link href="/register" className={navLinkClass}>
              <FaUserPlus className="text-2xl" />
              <span className={spanClass}>Register</span>
            </Link>

            {user && (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-medium flex flex-col items-center group relative"
              >
                <FaSignOutAlt className="text-2xl" />
                <span className={spanClass}>Logout</span>
              </button>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
