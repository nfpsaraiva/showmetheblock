import { Anchor, Collapse, Stack, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BlockWithTransactions, Utils } from "alchemy-sdk";
import { FC } from "react";
import { formatDate, timeAgo } from "../../utils/dateUtils";

interface BlockProps {
  block: BlockWithTransactions,
}

const Block: FC<BlockProps> = ({ block }: BlockProps) => {
  const [blockOpened, blockHandle] = useDisclosure(false);

  const externalUrl = `https://etherscan.io/block/${block.number}/`;

  const blockDate = timeAgo(block.timestamp * 1000);

  const value = block.transactions.reduce((sum, t) => sum + Number(t.value.toString()), 0)

  return (
    <>
      <UnstyledButton onClick={blockHandle.toggle}>
        <Text>{block.number}</Text>
        <Text size="sm" c={"dimmed"}>{blockDate}</Text>
      </UnstyledButton>

      <Collapse in={blockOpened}>
        <Stack mt={"lg"} gap={4}>
          <Text size="xs">{block.transactions.length} transactions</Text>
          <Text size="xs" lineClamp={2}>Total value: {value}</Text>
          <Text size="xs" lineClamp={2}>{formatDate(block.timestamp * 1000)}</Text>
          <Anchor size="xs" href={externalUrl} target="_blank">Full details</Anchor>
        </Stack>
      </Collapse>
    </>
  )
}

export default Block;