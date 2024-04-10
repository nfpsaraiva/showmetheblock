import { Anchor, Collapse, Stack, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BlockWithTransactions } from "alchemy-sdk";
import { FC } from "react";
import { formatDate, timeAgo } from "../../utils/dateUtils";

interface BlockProps {
  block: BlockWithTransactions
}

const Block: FC<BlockProps> = ({ block }: BlockProps) => {
  const [blockOpened, blockHandle] = useDisclosure(false);

  const externalUrl = `https://etherscan.io/block/${block.number}/`

  return (
    <>
      <UnstyledButton onClick={blockHandle.toggle}>
        <Text>{block.number}</Text>
        <Text size="xs" c={"dimmed"}>{timeAgo(block.timestamp * 1000)}</Text>
      </UnstyledButton>

      <Collapse in={blockOpened}>
        <Stack mt={"lg"} gap={4}>
          <Text size="xs">{block.transactions.length} transactions</Text>
          <Text size="xs">{formatDate(block.timestamp * 1000)}</Text>
          <Anchor size="xs" href={externalUrl} target="_blank">Full details</Anchor>
        </Stack>
      </Collapse>
    </>
  )
}

export default Block;