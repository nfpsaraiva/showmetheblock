import { ActionIcon, Anchor, Collapse, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BlockWithTransactions } from "alchemy-sdk";
import { FC, useEffect, useState } from "react";
import { formatDate, timeAgo } from "../../utils/dateUtils";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

interface BlockProps {
  block: BlockWithTransactions,
}

const Block: FC<BlockProps> = ({ block }: BlockProps) => {
  const [blockOpened, blockHandle] = useDisclosure(false);

  const externalUrl = `https://etherscan.io/block/${block.number}/`;

  const [blockDate, setBlockDate] = useState(timeAgo(block.timestamp * 1000));
  const currentTimestamp = new Date();

  useEffect(() => {
    setBlockDate(timeAgo(block.timestamp * 1000));
  }, [currentTimestamp])

  return (
    <>
      <Group justify="space-between" gap={"xl"}>
        <UnstyledButton onClick={blockHandle.toggle}>
          <Text>{block.number}</Text>
          <Text size="sm" c={"dimmed"}>{blockDate}</Text>
        </UnstyledButton>
        <ActionIcon variant="transparent" onClick={blockHandle.toggle}>
          {
            blockOpened 
            ? <IconChevronUp />
            : <IconChevronDown />
          }
        </ActionIcon>
      </Group>

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