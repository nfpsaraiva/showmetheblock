import { AppShell, Button, Center, Flex, Grid, Group, Modal, SimpleGrid, Space, Stack, Text, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Alchemy, Network } from "alchemy-sdk";
import { useState } from "react";
import { Block } from "../models/Block";
import ColorThemeSwitcher from "../components/ColorThemeSwitcher/ColorThemeSwitcher";

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
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header withBorder={false}>
        <Group justify="flex-end" h="100%" px="md">
          <ColorThemeSwitcher />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Modal opened={opened} onClose={close} title={`Block number ${block?.number}`} size={"xl"}>
          <Grid>
            <Grid.Col span={2}>
              <Text size="xs">Hash</Text>
            </Grid.Col>
            <Grid.Col span={10}>
              <Text size="xs">{block?.hash}</Text>
            </Grid.Col>
          </Grid>
        </Modal>
        <Center>
          <Stack gap={"xl"}>
            <Title ff={"mono"} lts={10}>show me the block</Title>

            <Group>
              <TextInput variant="unstyled" placeholder="Enter a numer" autoFocus size="xl" value={text} onChange={e => setText(e.target.value)} />

              <Button onClick={openModal}>
                Show me 
              </Button>
            </Group>
          </Stack>
        </Center>
      </AppShell.Main>
      <AppShell.Footer withBorder={false}>
        <Group h={"100%"} justify="center">
          <Text size="sm">2024 nfpsaraiva</Text>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
