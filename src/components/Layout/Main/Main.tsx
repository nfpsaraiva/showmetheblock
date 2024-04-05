import { FC } from "react";
import { AddressBalance, BlockList, SearchBox } from "../../../features";
import { Center, Stack, Title } from "@mantine/core";
import { useShallow } from "zustand/react/shallow";
import useStore from "../../../state/store";

const Main: FC = () => {
  const [searchTerm] = useStore(useShallow(state => [state.searchTerm]));

  return (
    <Stack align="center">
      <SearchBox />
      {
        searchTerm === "" || !isNaN(Number(searchTerm))
          ? <BlockList />
          : <AddressBalance />
      }
    </Stack>
  )
}

export default Main;