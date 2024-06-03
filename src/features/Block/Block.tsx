import { Anchor, Collapse, Stack, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BlockWithTransactions, Utils } from "alchemy-sdk";
import { FC } from "react";
import { formatDate } from "../../utils/dateUtils";

interface BlockProps {
  block: BlockWithTransactions,
  blockTimeAgo: string
}

const Block: FC<BlockProps> = ({ block, blockTimeAgo }: BlockProps) => {
  const [blockOpened, blockHandle] = useDisclosure(false);

  const externalUrl = `https://etherscan.io/block/${block.number}/`;

  const value = block.transactions.reduce((sum, t) => sum + Number(Utils.formatEther(t.value)), 0);

  return (
    <>
      <UnstyledButton onClick={blockHandle.toggle}>
        <Text>{block.number}</Text>
        <Text size="sm" c={"dimmed"}>{blockTimeAgo}</Text>
      </UnstyledButton>

      <Collapse in={blockOpened}>
        <Stack mt={"lg"} gap={4}>
          <Text size="xs">{block.transactions.length} transactions</Text>
          <Text size="xs" lineClamp={2}>{value.toFixed(2)} ETH transacted</Text>
          <Text size="xs" lineClamp={2}>{formatDate(block.timestamp * 1000)}</Text>
          <Anchor size="xs" href={externalUrl} target="_blank">Full details</Anchor>
        </Stack>
      </Collapse>
    </>
  )
}

export default Block;