import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Alchemy, Network } from "alchemy-sdk";

const client = new Alchemy({
    apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
});

const useBlocksQuery = (lastBlockNumber: number) => {
    return useInfiniteQuery({
        queryKey: ['blocks'],
        queryFn: async ({ pageParam }) => {
            let blocksNumbers = [];
            for (let i = pageParam; i > (pageParam - 10); i--) blocksNumbers.push(i);

            return await Promise.all(blocksNumbers.map(async number => {
                return await client.core.getBlockWithTransactions(number);
            }));
        },
        initialPageParam: lastBlockNumber,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length < 10) return null;

            return lastBlockNumber - (10 * pages.length);
        },
        enabled: lastBlockNumber > 0
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
    useBlocksQuery,
    useLastBlockNumberQuery
}