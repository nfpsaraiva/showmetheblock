import { Card, Collapse, Group, Paper, Stack, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BlockWithTransactions } from "alchemy-sdk";
import { FC } from "react";
import { timeAgo } from "../../utils/dateUtils";

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
        <Stack mt={"md"}>
          <Text size="xs">{block.transactions.length} transactions</Text>
        </Stack>
      </Collapse>
    </>
  )
}

export default Block;