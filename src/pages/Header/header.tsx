import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import { Input } from "@chakra-ui/react";
const Header = ({ searchTerm, setSearchTerm, handleSearch }: any = {}) => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <Image width={60} src={logo} alt="GitHub Logo" />
        </Link>
      </div>
      <form className={styles.form} onSubmit={handleSearch}>
        <Input
          type="text"
          maxWidth={800}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Поиск по имени"
        />

        <button className={styles.button} type="submit">
          Найти
        </button>
      </form>
    </div>
  );
};

export default Header;
