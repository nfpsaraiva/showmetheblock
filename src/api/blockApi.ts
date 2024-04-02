import { useQuery } from "@tanstack/react-query";
import { Alchemy, AssetTransfersCategory, Network } from "alchemy-sdk";

const client = new Alchemy({
    apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
});

const useBlocksQuery = (address: string) => {
    return useQuery({
        queryKey: ['blocks'],
        queryFn: async () => {
            const transfers = await client.core.getAssetTransfers({
                fromAddress: address,
                category: [
                    AssetTransfersCategory.EXTERNAL,
                    AssetTransfersCategory.INTERNAL,
                    AssetTransfersCategory.ERC20,
                ]
            });

            const blocksNums = transfers.transfers.map(transfer => {
                return transfer.blockNum
            });

            const uniqueNums = [...new Set(blocksNums)];

            return Promise.all(uniqueNums.reverse().map(async num => {
                return await client.core.getBlockWithTransactions(num);
            }))
        },
        enabled: address !== ""
    })
}

export {
    useBlocksQuery,
}