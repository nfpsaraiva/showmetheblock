import { FC } from "react";
import { Button, Center, Loader, Stack, Text, Timeline } from "@mantine/core";
import Block from "../Block/Block";
import useStore from "../../state/store";
import { useShallow } from "zustand/react/shallow";
import { useBlocksQuery, useLastBlockNumber } from "../../api/BlockApi";
import { IconGitBranch, IconGitCommit, IconGitPullRequest, IconMessageDots, IconReload } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";

const BlockList: FC = () => {
  const queryClient = useQueryClient();
  
  const [searchTerm] = useStore(useShallow(state => [state.searchTerm]));

  const { data: lastBlockNumber } = useLastBlockNumber();

  const {
    data: blocks,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
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
        <Stack gap={"xl"}>
          <Button
            variant="subtle"
            leftSection={<IconReload size={14} />}
            onClick={() => queryClient.invalidateQueries()}
          >
            Fetch new blocks
          </Button>
          <Timeline bulletSize={35} active={1} lineWidth={2}>
            {
              blocks.pages.map(page => {
                return page.map(block => <Block key={block.number} block={block} />)
              })
            }
          </Timeline>
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            variant="subtle"
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