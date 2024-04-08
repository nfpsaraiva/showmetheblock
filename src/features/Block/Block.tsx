import { ActionIcon, Card, Collapse, Text, Timeline, Tooltip, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCube } from "@tabler/icons-react";
import { BlockWithTransactions } from "alchemy-sdk";
import { FC } from "react";

interface BlockProps {
  block: BlockWithTransactions
}

const Block: FC<BlockProps> = ({ block }: BlockProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }

  return (
    <Timeline.Item bullet={<IconCube />} title={block.number}>
      <UnstyledButton>
        <Text c={"dimmed"}>{block.transactions.length} transactions</Text>
        <Text size="xs" mt={4}>{formatDate(block.timestamp)}</Text>
      </UnstyledButton>
    </Timeline.Item>
  )
}

export default Block;