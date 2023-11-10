// pages/index.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import User from "@/types/types";

interface HomeProps {
  users: User[];
}

const Home: React.FC<HomeProps> = ({ users: initialUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchTerm}`
    );
    const searchedUsers: { items?: User[] } = await response.json();
    setUsers(searchedUsers.items || initialUsers);
  };

  useEffect(() => {
    // Если поле поиска пустое, восстанавливаем исходный список пользователей
    if (searchTerm.trim() === "") {
      setUsers(initialUsers);
    }
  }, [searchTerm, initialUsers]);

  return (
    <div>
      <h1>Список пользователей</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Поиск по имени"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Искать</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/user/${user.id}`}>{user.login}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const response = await fetch("https://api.github.com/users");
  const users: User[] = await response.json();

  return {
    props: {
      users,
    },
  };
};

export default Home;
