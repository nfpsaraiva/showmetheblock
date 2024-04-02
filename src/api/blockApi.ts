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
            let blocks: Block[] = [];
            
            const transfersFrom = await client.core.getAssetTransfers({
                fromAddress: address,
                category: [
                    AssetTransfersCategory.EXTERNAL,
                    AssetTransfersCategory.ERC20,
                ]
            });

            const transfersTo = await client.core.getAssetTransfers({
                fromAddress: address,
                category: [
                    AssetTransfersCategory.EXTERNAL,
                    AssetTransfersCategory.ERC20,
                ]
            });

            for (const transfer of transfersFrom.transfers) {
                const block = blocks.find(b => b.hexNum === transfer.blockNum);

                if (!block) {
                    blocks.push({
                        hexNum: transfer.blockNum,
                        number: 0,
                        timestamp: 123,
                        sents: [
                            {
                                address: transfer.to,
                                value: transfer.value
                            }
                        ],
                        receives: []
                    });

                    continue;
                }

                blocks = blocks.filter(b => b.hexNum !== transfer.blockNum);
                blocks.push({
                    ...block,
                    sents: [
                        ...block.sents,
                        {
                            address: transfer.to,
                            value: transfer.value
                        }
                    ]
                });
            }

            for (const transfer of transfersTo.transfers) {
                const block = blocks.find(b => b.hexNum === transfer.blockNum);

                if (!block) {
                    blocks.push({
                        hexNum: transfer.blockNum,
                        number: 0,
                        timestamp: 123,
                        sents: [],
                        receives: [{
                            address: transfer.from,
                            value: transfer.value
                        }]
                    });

                    continue;
                }

                blocks = blocks.filter(b => b.hexNum !== transfer.blockNum);
                blocks.push({
                    ...block,
                    receives: [
                        ...block.receives,
                        {
                            address: transfer.from,
                            value: transfer.value
                        }
                    ]
                });
            }

            blocks = await Promise.all(blocks.map(async block => {
                const b = await client.core.getBlockWithTransactions(block.hexNum);

                return {
                    ...block,
                    number: b.number,
                    timestamp: b.timestamp
                }
            }));

            return blocks;
        },
        enabled: address !== ""
    })
}

export {
    useBlocksQuery,
}