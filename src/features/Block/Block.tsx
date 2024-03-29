import { Accordion, ActionIcon, Button, Center, Popover, Stack, Text } from "@mantine/core";
import { IconCube } from "@tabler/icons-react";
import { BlockWithTransactions } from "alchemy-sdk";
import { FC } from "react";

interface BlockProps {
    block: BlockWithTransactions
}

const Block: FC<BlockProps> = ({ block }: BlockProps) => {
    return (
        <Accordion.Item value={block.hash}>
            <Accordion.Control>
            {block.number}

            </Accordion.Control>
            <Accordion.Panel>
                cenas
            </Accordion.Panel>
        </Accordion.Item>
    )
}

export default Block;