'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Package, LogOut } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const { cart, clearCart  } = useCartStore();

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
    clearCart();
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('cart-storage'); 

    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E2D9] bg-[#FCFAF7]">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-2">

        {/* Logo */}

        <Link
          href="/"
          className="font-serif text-[20px] font-semibold tracking-tight text-[#2B1B12]"
        >
          Ember&Co
        </Link>

        {/* Right */}

        <nav className="flex items-center gap-10">

          <Link
            href="/"
            className="text-[14px] font-medium text-[#3A312B] transition hover:text-[#F47C2C]"
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
  size={20}
  strokeWidth={1.8}
  className="text-[#2B1B12] transition hover:text-[#F47C2C]"
/>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-[#E6E1DA] bg-white shadow-lg">

                  <div className="border-b border-[#E6E1DA] px-3 py-2 text-sm text-[#6B665F]">
                    {email}
                  </div>

                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-[#2B1B12] hover:bg-[#FAF8F5]"
                  >
                    <Package size={18} strokeWidth={1.8} />
                    My Orders
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2 text-left text-[13px] font-medium text-[#2B1B12] hover:bg-[#FAF8F5]"
                  >
                    <LogOut size={15} strokeWidth={1.8} />
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
            <ShoppingBag
  size={20}
  strokeWidth={1.8}
  className="text-[#2B1B12]"
/>

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#F47C2C] text-[10px] font-medium text-white">
                {cartCount}
              </span>
            )}
          </Link>

        </nav>
      </div>
    </header>
  );
}