import { useQuery } from "@tanstack/react-query";
import { Alchemy, AssetTransfersCategory, Network } from "alchemy-sdk";
import Block from "../types/Block";

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
                    AssetTransfersCategory.ERC20,
                ]
            });

            let blocks: Block[] = [];

            for (const transfer of transfers.transfers) {
                const block = blocks.find(b => b.number === transfer.blockNum);

                if (block) {
                    blocks = blocks.filter(b => b.number !== transfer.blockNum);
                    blocks.push({
                        ...block,
                        sents: block.sents + 1
                    });

                    continue;
                }


                blocks.push({
                    number: transfer.blockNum,
                    timestamp: 123,
                    sents: 1,
                    receives: 1
                });
            }

            return await Promise.all(blocks.map(async block => {
                const b = await client.core.getBlockWithTransactions(block.number);

                return {
                    ...block,
                    timestamp: b.timestamp
                }
            }));
        },
        enabled: address !== ""
    })
}

export {
    useBlocksQuery,
}