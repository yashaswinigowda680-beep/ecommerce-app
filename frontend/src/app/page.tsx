'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <h1>E-Commerce App</h1>

      <Link href="/register">
        <button>Register</button>
      </Link>

      <Link href="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}