import { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import useStore from "../../state/store";
import { Card } from "@mantine/core";
import { Utils } from "alchemy-sdk";
import { useAddressBalance } from "../../api/AddressApi";

const AddressBalance: FC = () => {
  const [searchTerm] = useStore(useShallow(state => [state.searchTerm]));
  const { data: balance } = useAddressBalance(searchTerm);

  return (
    <Card>
      {balance && Utils.formatEther(balance)} ether
    </Card>
  )
}

export default AddressBalance;