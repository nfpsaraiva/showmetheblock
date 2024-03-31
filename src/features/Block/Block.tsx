import { Accordion, ActionIcon, Button, Center, Group, Popover, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconCube, IconExternalLink } from "@tabler/icons-react";
import { BlockWithTransactions } from "alchemy-sdk";
import { FC } from "react";

interface BlockProps {
  block: BlockWithTransactions
}

const Block: FC<BlockProps> = ({ block }: BlockProps) => {
  return (
    <Accordion.Item value={block.hash}>
      <Accordion.Control icon={<IconCube size={20} />}>
        <Group justify="space-between">
          <Group>
            <Text>
              #{block.number}
            </Text>
          </Group>
          <Group>
            <Text size="xs">
              {block.transactions.length} transactions
            </Text>
            <ActionIcon variant="subtle" component="a" target="_blank" href={`https://etherscan.io/block/${block.number}`}>
              <IconExternalLink size={14} />
            </ActionIcon>
          </Group>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <SimpleGrid cols={2}>
          <Text>Miner</Text>
          <Text size="xs">{block.miner}</Text>
        </SimpleGrid>
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export default Block;