'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Package, LogOut } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const { cart } = useCartStore();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email');

    setIsLoggedIn(!!token);
    setEmail(userEmail || '');
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
  }, []);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');

    window.location.href = '/';
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          Ember&Co
        </Link>

        {/* Right */}

        <nav className="flex items-center gap-8">

          <Link
            href="/"
            className="hover:text-orange-500"
          >
            Shop
          </Link>

          {!isLoggedIn ? (
            <Link
              href="/login"
              className="hover:text-orange-500"
            >
              Sign In
            </Link>
          ) : (
            <div
              className="relative"
              ref={dropdownRef}
            >
              <button
                onClick={() => setOpen(!open)}
              >
                <User
                  size={22}
                  className="hover:text-orange-500"
                />
              </button>

              {open && (
                <div className="absolute right-0 mt-4 w-64 rounded-2xl border border-gray-200 bg-white shadow-xl">

                  <div className="border-b p-4 text-sm text-gray-600">
                    {email}
                  </div>

                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50"
                  >
                    <Package size={18} />
                    My Orders
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-4 text-left hover:bg-gray-50"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>

                </div>
              )}
            </div>
          )}

          <Link
            href="/cart"
            className="relative"
          >
            <ShoppingBag size={22} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

        </nav>
      </div>
    </header>
  );
}