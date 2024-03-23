import { Anchor, Text } from "@mantine/core";
import { FC } from "react";

interface BlockAddressProps {
    label: string;
    number: number;
}

const BlockAddress: FC<BlockAddressProps> = ({ label, number }: BlockAddressProps) => {
    return (
        <Anchor href={`https://etherscan.io/block/${number}`} target="_blank">
            {label}
        </Anchor>
    )
}

export default BlockAddress;