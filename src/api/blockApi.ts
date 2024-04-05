import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Alchemy, AssetTransfersCategory, Network } from "alchemy-sdk";

const client = new Alchemy({
    apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
});

const useLastBlockNumber = () => {
    return useQuery({
        queryKey: ["lastBlockNumber"],
        queryFn: async () => await client.core.getBlockNumber()
    })
}

const useBlocksQuery = (lastBlockNumber: number = 0, blockNumber: number = 0) => {
    return useInfiniteQuery({
        queryKey: ['blocks', lastBlockNumber, blockNumber],
        initialPageParam: lastBlockNumber,
        queryFn: async () => {
            if (blockNumber > 0) return [await client.core.getBlockWithTransactions(blockNumber)];

            const numbers = [];
            for (let i = lastBlockNumber; i > (lastBlockNumber - 10); i--) numbers.push(i);

            return await Promise.all(numbers.map(async n => client.core.getBlockWithTransactions(n)));
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length === 0) return null;

            return lastBlockNumber - allPages.length * 10
        },
        enabled: lastBlockNumber > 0 && !isNaN(blockNumber)
    })
}

export {
    useLastBlockNumber,
    useBlocksQuery,
}