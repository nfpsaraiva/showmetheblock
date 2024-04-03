import { useQuery } from "@tanstack/react-query";
import { Alchemy, AssetTransfersCategory, BlockWithTransactions, Network } from "alchemy-sdk";
import Block from "../types/Block";

const client = new Alchemy({
    apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
});

const useBlocksQuery = (address: string) => {
    return useQuery({
        queryKey: ['blocks', address],
        queryFn: async () => {

            const transfersFrom = await client.core.getAssetTransfers({
                fromAddress: address,
                category: [
                    AssetTransfersCategory.EXTERNAL,
                    AssetTransfersCategory.ERC20,
                ]
            });

            const transfersTo = await client.core.getAssetTransfers({
                toAddress: address,
                category: [
                    AssetTransfersCategory.EXTERNAL,
                    AssetTransfersCategory.ERC20,
                ]
            });

            const blockNumsFrom = transfersFrom.transfers.map(t => t.blockNum);
            const blockNumsTo = transfersTo.transfers.map(t => t.blockNum);

            const blocksNums = [...new Set([
                ...blockNumsFrom,
                ...blockNumsTo
            ])];

            const blocks: BlockWithTransactions[] = [];

            for (const num of blocksNums) {
                const b = await client.core.getBlockWithTransactions(num);

                blocks.push(b);
            }

            return blocks;
        },
        enabled: address !== ""
    })
}

export {
    useBlocksQuery,
}