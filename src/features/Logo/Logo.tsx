import { Group, Image, Title } from "@mantine/core";
import { FC } from "react";
import logo from "./logo.png";

const Logo: FC = () => {
  return (
    <Group align="flex-end" ta={"center"}>
      <Title visibleFrom="sm" lts={6}>show me the blocks</Title>
      <Title hiddenFrom="sm" size={"h3"} lts={6}>show me the blocks</Title>
    </Group>
  )
};

export default Logo;