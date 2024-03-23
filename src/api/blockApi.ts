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

export {
    useBlockQuery
}