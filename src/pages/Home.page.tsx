import { Button, Center, Group, Modal, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Alchemy, Network } from "alchemy-sdk";
import { useState } from "react";
import { Block } from "../models/Block";

export function HomePage() {
  const [text, setText] = useState('');
  const [block, setBlock] = useState<Block>();
  const [opened, { open, close }] = useDisclosure();

  const settings = {
    apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  const client = new Alchemy(settings);

  const openModal = async () => {
    const block: Block = await client.core.getBlockWithTransactions(parseInt(text));
    console.log(block);

    setBlock(block);
    open();
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title={block?.number} size={"xl"}>
        <SimpleGrid cols={2}>
          <Text size="xs">Hash</Text>
          <Text size="xs">{block?.hash}</Text>
        </SimpleGrid>
      </Modal>
      <Center>
        <Stack>
          <Title>show me the block</Title>

          <Group>
            <TextInput value={text} onChange={e => setText(e.target.value)} />

            <Button onClick={openModal}>
              Go
            </Button>
          </Group>
          <Center>
            <Text size="sm">2024 nfpsaraiva</Text>
          </Center>
        </Stack>
      </Center>
    </>
  );
}
