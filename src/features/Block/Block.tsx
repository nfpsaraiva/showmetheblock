import { Anchor, Collapse, Stack, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { BlockWithTransactions } from "alchemy-sdk";
import { FC } from "react";
import { formatDate, timeAgo } from "../../utils/dateUtils";

interface BlockProps {
  block: BlockWithTransactions,
}

const Block: FC<BlockProps> = ({ block }: BlockProps) => {
  const { hovered, ref } = useHover();

  const [blockOpened, blockHandle] = useDisclosure(false);

  const externalUrl = `https://etherscan.io/block/${block.number}/`

  return (
    <div ref={ref}>
      <UnstyledButton onClick={blockHandle.toggle}>
        <Text fw={hovered ? 700 : 500}>{block.number}</Text>
        <Text size="sm" c={"dimmed"}>{timeAgo(block.timestamp * 1000)}</Text>
      </UnstyledButton>

      <Collapse in={blockOpened}>
        <Stack mt={"lg"} gap={4}>
          <Text size="sm">{block.transactions.length} transactions</Text>
          <Text size="sm">{formatDate(block.timestamp * 1000)}</Text>
          <Anchor size="sm" href={externalUrl} target="_blank">Full details</Anchor>
        </Stack>
      </Collapse>
    </div>
  )
}

export default Block;