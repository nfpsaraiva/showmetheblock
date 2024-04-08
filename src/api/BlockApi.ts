import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Alchemy, Network } from "alchemy-sdk";

const client = new Alchemy({
    apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
});

const useLastBlockNumber = () => {
    return useQuery({
        queryKey: ["lastBlockNumber"],
        queryFn: async () => await client.core.getBlockNumber(),
    })
}

const useBlocksQuery = (lastBlockNumber: number = 0, blockNumber: number = 0) => {
    const LIMIT = 10;

    const number = blockNumber > 0 ? blockNumber : lastBlockNumber;

    return useInfiniteQuery({
        queryKey: ['blocks', lastBlockNumber, blockNumber],
        initialPageParam: number,
        queryFn: async ({ pageParam }) => {
            const numbers = [];
            for (let i = pageParam; i > (pageParam - LIMIT); i--) numbers.push(i);

            return await Promise.all(numbers.map(async n => client.core.getBlockWithTransactions(n)));
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < LIMIT) return null;

            return number - allPages.length * LIMIT
        },
        enabled: lastBlockNumber > 0 && !isNaN(blockNumber),
        placeholderData: (previousData, previousQuery) => previousData
    })
}

export {
    useLastBlockNumber,
    useBlocksQuery,
}