import { FC } from "react";
import { useBlocksQuery, useLastBlockNumberQuery } from "../../api/blockApi";
import { Accordion, Button, Center, Loader, Stack, Text } from "@mantine/core";
import Block from "../Block/Block";

const BlockList: FC = () => {
  const { data: lastBlockNumber } = useLastBlockNumberQuery();
  const {
    data: blocks,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useBlocksQuery(lastBlockNumber || 0);

  return (
    <Stack gap={"xl"} mx={"auto"}>
      {
        isLoading && <Center><Loader /></Center>
      }
      {
        isError && <Center><Text>Something went wrong</Text></Center>
      }
      {
        blocks &&
        <Accordion variant="separated" radius={"md"} chevron={null}>
          {
            blocks.pages.map(page => {
              return page.map(block => <Block block={block} />)
            })
          }
        </Accordion>
      }
      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
      </Button>
    </Stack>
  )
}

export default BlockList;