import { ActionIcon, Popover } from "@mantine/core";
import { IconCube } from "@tabler/icons-react";
import { BlockWithTransactions } from "alchemy-sdk";
import { FC } from "react";

interface BlockProps {
  block: BlockWithTransactions
}

const Block: FC<BlockProps> = ({ block }: BlockProps) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }

  return (
    <Popover>
      <Popover.Target>
        <ActionIcon>
          <IconCube size={50} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        {formatDate(block.timestamp)}
      </Popover.Dropdown>
    </Popover>
  )
}

export default Block;