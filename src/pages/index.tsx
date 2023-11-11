// pages/index.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import User from "@/types/types";
import styles from "./all-users.module.css";

import { Avatar, Badge, Box, Flex, Text, Grid } from "@chakra-ui/react";
import Header from "./Header/header";

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
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <div className={styles.container}>
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={10}>
          {users.map((user) => (
            <Link
              className={styles.card}
              key={user.id}
              href={`/user/${user.id}`}
            >
              <Flex>
                <Avatar src={user.avatar_url} />
                <Box ml="3">
                  <Text fontWeight="bold">
                    {user.login}
                    <Badge ml="1" colorScheme="green">
                      {user.site_admin ? "Admin" : "User"}
                    </Badge>
                  </Text>
                  <Text fontSize="sm">
                    Репозиториев:{user.repos_url.length}
                  </Text>
                </Box>
              </Flex>
            </Link>
          ))}
        </Grid>
      </div>
    </>
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
