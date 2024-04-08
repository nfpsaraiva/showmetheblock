import { ActionIcon, Anchor, Button, Card, Collapse, Text, Timeline, Tooltip, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCube } from "@tabler/icons-react";
import { BlockWithTransactions } from "alchemy-sdk";
import { FC } from "react";
import { formatDate, timeAgo } from "../../utils/dateUtils";

interface BlockProps {
  block: BlockWithTransactions
}

const Block: FC<BlockProps> = ({ block }: BlockProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <UnstyledButton onClick={toggle}>
        <Text>{block.number}</Text>
        <Text size="xs" c={"dimmed"}>{timeAgo(block.timestamp * 1000)}</Text>
      </UnstyledButton>

      <Collapse in={opened}>
      </Collapse>
    </>
  )
}

export default Block;