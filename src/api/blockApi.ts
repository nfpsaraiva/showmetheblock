import { useQuery } from "@tanstack/react-query";
import { Alchemy, Network } from "alchemy-sdk";

const client = new Alchemy({
    apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
});

const useBlockQuery = (blockNumber: number) => {
    return useQuery({
        queryKey: ['blocks', blockNumber],
        queryFn: async () => {
            return await client.core.getBlockWithTransactions(blockNumber);
        },
        enabled: blockNumber > 0
    })
}

const useBlocksQuery = (blocksNumbers: number[]) => {
    return useQuery({
        queryKey: ['blocks', blocksNumbers],
        queryFn: async () => {
            return await Promise.all(blocksNumbers.map(async number => {
                return await client.core.getBlockWithTransactions(number);
            }));

        },
        enabled: blocksNumbers.length > 0
    })
}

const useLastBlockNumberQuery = () => {
    return useQuery({
        queryKey: ['block', 'latest'],
        queryFn: async () => {
            return await client.core.getBlockNumber();

        },
    })
}

export {
    useBlockQuery,
    useBlocksQuery,
    useLastBlockNumberQuery
}