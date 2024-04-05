import { FC } from "react";
import { Button, Center, Loader, Stack, Text } from "@mantine/core";
import Block from "../Block/Block";
import useStore from "../../state/store";
import { useShallow } from "zustand/react/shallow";
import { useBlocksQuery, useLastBlockNumber } from "../../api/BlockApi";

const BlockList: FC = () => {
  const [searchTerm] = useStore(useShallow(state => [state.searchTerm]));

  const { data: lastBlockNumber } = useLastBlockNumber();
  const {
    data: blocks,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useBlocksQuery(lastBlockNumber || 0, Number(searchTerm));

  return (
    <Stack gap={"xl"} mx={"auto"}>
      {
        isLoading && <Center><Loader /></Center>
      }
      {
        isError && <Center><Text>Nothing found</Text></Center>
      }
      {
        blocks &&
        <Stack align="center">
          {
            blocks.pages.map(page => {
              return page.map(block => <Block key={block.number} block={block} />)
            })
          }
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage ? 'Load More' : 'Nothing more to load'
            }
          </Button>
        </Stack>
      }
    </Stack>
  )
}

export default BlockList;