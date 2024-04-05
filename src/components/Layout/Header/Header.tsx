import { Group, Title } from "@mantine/core";
import { FC } from "react";

const Header: FC = () => {
  return (
    <Group h="100%" px={"md"}>
      <Title size={24} ff={"mono"} lts={4}>show me the block</Title>
    </Group>
  )
}

export default Header;