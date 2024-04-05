import { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import useStore from "../../state/store";
import { useAddressBalance } from "../../api/addressApi";
import { Card } from "@mantine/core";

const AddressBalance: FC = () => {
  const [searchTerm] = useStore(useShallow(state => [state.searchTerm]));
  const {data: balance} = useAddressBalance(searchTerm);
  
  return (
    <Card>
      {Number(balance)}
    </Card>
  )
}

export default AddressBalance;