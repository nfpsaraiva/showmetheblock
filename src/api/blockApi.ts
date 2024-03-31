import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Alchemy, Network } from "alchemy-sdk";

const client = new Alchemy({
    apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
});

const useBlocksQuery = (lastBlockNumber: number, limit: number = 10) => {
    return useInfiniteQuery({
        queryKey: ['blocks'],
        queryFn: async ({ pageParam }) => {
            let blocksNumbers = [];
            for (let i = pageParam; i > (pageParam - limit); i--) blocksNumbers.push(i);

            return await Promise.all(blocksNumbers.map(async number => {
                return await client.core.getBlockWithTransactions(number);
            }));
        },
        initialPageParam: lastBlockNumber,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length < limit) return null;

            return lastBlockNumber - (limit * pages.length);
        },
        enabled: lastBlockNumber > 0
    })
}

const useLastBlockNumberQuery = () => {
    return useQuery({
        queryKey: ['blocks', 'latest'],
        queryFn: () => client.core.getBlockNumber(),
    })
}

export {
    useBlocksQuery,
    useLastBlockNumberQuery
}