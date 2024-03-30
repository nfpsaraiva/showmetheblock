import { Center, Group, Stack, TextInput, Title } from "@mantine/core";
import { FC } from "react";
import useStore from "../../../state/store";
import { useShallow } from "zustand/react/shallow";

const Header: FC = () => {
  const [
    searchTerm,
    setSearchTerm
  ] = useStore(useShallow(state => [
    state.searchTerm,
    state.setSearchTerm
  ]));

  return (
    <Group justify="center" h="100%">
      <Stack gap={"xl"}>
        <Center>
          <Title size={24} ff={"mono"} lts={15}>show me the block</Title>
        </Center>
        <TextInput
          placeholder="Search"
          rightSection={<></>}
          autoFocus
          styles={{
            input: {
              textAlign: "center",
            }
          }}
          prefix="#"
          w={"auto"}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Stack>
    </Group>
  )
}

export default Header;