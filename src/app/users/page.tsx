'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa'; // Import FaUserCircle icon

type User = {
  id: number;
  name: string;
  username: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="p-4 sm:p-6 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto bg-white/30 backdrop-blur-md rounded-2xl shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">User List</h1>
      <ul className="space-y-2">
        {users.map(user => (
          <li
            key={user.id}
            className="p-4 rounded shadow-md bg-white/50 backdrop-blur-sm hover:bg-black hover:text-white transition"
          >
            <Link href={`/users/${user.id}`}>
              <div className="flex items-center space-x-3">
                <FaUserCircle className="text-4xl sm:text-5xl text-blue-500" />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">@{user.username}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  
}
