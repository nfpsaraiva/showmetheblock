import { Button, Group, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import useStore from "../../state/store";
import { useShallow } from "zustand/react/shallow";

const SearchBox: FC = () => {
  const [value, setValue] = useState('');
  const [setSearchTerm] = useStore(useShallow(state => [state.setSearchTerm]));

  const submit = () => {
    setSearchTerm(value);
  }

  return (
    <Group>
      <TextInput
        placeholder="Search"
        autoFocus
        styles={{
          input: {
            textAlign: "center",
          }
        }}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <Button onClick={submit}>
        Show me the blocks
      </Button>
    </Group>
  )
}

export default SearchBox;