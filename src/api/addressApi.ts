import { useQuery } from "@tanstack/react-query";
import { Alchemy, Network } from "alchemy-sdk";

const client = new Alchemy({
    apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
});

const useAddressBalance = (address: string) => {
    return useQuery({
        queryKey: [address],
        queryFn: async () => await client.core.getBalance(address),
        enabled: address !== ""
    })
}

export {
    useAddressBalance
}