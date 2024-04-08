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
    <Timeline.Item bullet={<IconCube />} title={block.number}>
      <Tooltip label={formatDate(block.timestamp * 1000)}>
        <Text size="xs" c={"dimmed"}>{timeAgo(block.timestamp * 1000)}</Text>
      </Tooltip>
      <Button size="xs" onClick={toggle} px={0} variant="transparent">See more</Button>

      <Collapse in={opened}>
        <Card>
          asdf
        </Card>
      </Collapse>
    </Timeline.Item>
  )
}

export default Block;