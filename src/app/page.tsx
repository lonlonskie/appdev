'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Please fill in both fields.');
      setLoading(false);
      return;
    }

    //Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    // Admin credentials
    if (cleanEmail === 'admin@admin.com' && cleanPassword === 'admin123') {
      const adminUser = {
        id: 0,
        name: 'Admin',
        email: 'admin@admin.com',
        isAdmin: true,
      };
      localStorage.setItem('user', JSON.stringify(adminUser));
      setTimeout(() => {
        router.push('posts');
      }, 100);
      return;
    }

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await res.json();

      const user = users.find((u: any) => u.email.toLowerCase() === cleanEmail);

      if (user && cleanPassword === user.username) {
        localStorage.setItem('user', JSON.stringify({ ...user, isAdmin: false }));
        router.push('/myposts');
      } else {
        setError('Invalid credentials. Use your email as username and your username as password.');
      }
    } catch (err) {
      setError('Login failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-20 px-4">
      <div className="p-6 w-full sm:w-[90%] md:w-[60%] lg:w-[40%] bg-white/80 backdrop-blur-md shadow-md rounded-xl">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email (e.g., Sincere@april.biz)"
            className="w-full border-b-2 border-gray-400 focus:border-green-500 outline-none bg-transparent py-2 transition duration-300"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password (use your username from JSONPlaceholder)"
            className="w-full border-b-2 border-gray-400 focus:border-green-500 outline-none bg-transparent py-2 transition duration-300"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <a href="/register" className="text-green-600 hover:underline">
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
  
  
  
  
  
}
