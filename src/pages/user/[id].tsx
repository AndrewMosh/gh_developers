// pages/user/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

import User from "@/types/types";

const UserDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);
  console.log(user);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`https://api.github.com/user/${id}`);
      const userData: User = await response.json();
      setUser(userData);
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user.login}
      <Image src={user.avatar_url} alt={user.login} width={200} height={200} />
      <div> Подписчиков: {user.followers_url.length}</div>
      <div> Подписок: {user.following_url.length}</div>
      <div>Репозиториев: {user.repos_url.length}</div>
      Статус:
      {user.site_admin === true ? "Администратор" : "Пользователь"}
      <div> Звезд: {user.starred_url.length}</div>
      <div>Избранных: {user.subscriptions_url.length}</div>
    </div>
  );
};

export default UserDetails;
