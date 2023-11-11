// pages/user/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import User from "@/types/types";
import styles from "./userdetails.module.css";
import logo from "../../assets/logo.svg";
import Link from "next/link";
import back from "../../assets/back.png";
import {
  Card,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Stack,
  Image as ChakraImage,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Td,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";
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
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="black.500"
          size="xl"
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.back} href="/">
          <Image width={40} src={back} alt="back" />
        </Link>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <ChakraImage
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={user.avatar_url}
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody>
              <Heading size="md">{user.login}</Heading>

              <Text py="2">
                {user.bio ? user.bio : `Hi! I'm ${user.login} `}
              </Text>
            </CardBody>

            <CardFooter>
              <Link href={user.html_url} target="_blank">
                <Image
                  title="ссылка на GitHub"
                  width={50}
                  src={logo}
                  alt="ссылка на GitHub"
                />
              </Link>
            </CardFooter>
          </Stack>
        </Card>
        <TableContainer>
          <Table>
            <Thead>
              <Tr></Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontWeight="bold">Id</Td>

                <Td isNumeric>{user.id}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Followers</Td>

                <Td isNumeric>{user.followers_url.length}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Following</Td>

                <Td isNumeric>{user.following_url.length}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Repos</Td>

                <Td isNumeric>{user.repos_url.length}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Starred</Td>

                <Td isNumeric>{user.starred_url.length}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Subscriptions</Td>

                <Td isNumeric>{user.subscriptions_url.length}</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr></Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default UserDetails;
