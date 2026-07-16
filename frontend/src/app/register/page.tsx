'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { AxiosError } from 'axios';
export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      alert(response.data.message);

      router.push('/login');
    } catch (error) {
  console.error(error);

  if (error instanceof AxiosError) {
    alert(error.response?.data?.message || 'Registration failed');
  } else {
    alert('Something went wrong');
  }
}
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F5EF] px-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

        <h1 className="text-5xl font-serif font-bold text-[#2B1B12]">
          Welcome
        </h1>

        <p className="mt-3 text-gray-600">
          Create your account to start shopping.
        </p>

        {/* Tabs */}

        <div className="mt-8 flex rounded-xl bg-[#EFE8DF] p-1">

          <Link
            href="/login"
            className="flex flex-1 items-center justify-center rounded-lg py-2 font-medium text-gray-700"
          >
            Sign in
          </Link>

          <button className="flex-1 rounded-lg bg-white py-2 font-medium shadow-sm">
            Create account
          </button>

        </div>

        {/* Name */}

        <div className="mt-8">
          <label className="mb-2 block font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
    onChange={(e) => {
  const value = e.target.value;

  if (/^[A-Za-z ]*$/.test(value)) {
    setName(value);
  }
}}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#3B2416]"
          />
        </div>

        {/* Email */}

        <div className="mt-6">
          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#3B2416]"
          />
        </div>

        {/* Password */}

        <div className="mt-6">
          <label className="mb-2 block font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#3B2416]"
          />
        </div>

        <button
          onClick={handleRegister}
          className="mt-8 w-full rounded-xl bg-[#3B2416] py-3 text-lg font-semibold text-white transition hover:bg-[#2B1B12]"
        >
          Create Account
        </button>

      </div>
    </div>
  );
}