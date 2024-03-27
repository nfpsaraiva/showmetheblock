import { ActionIcon, AppShell, Card, Group, Loader, NumberInput, Stack, Text, Title, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import ColorThemeSwitcher from "../components/ColorThemeSwitcher/ColorThemeSwitcher";
import { IconArrowLeft, IconArrowRight, IconCube } from '@tabler/icons-react';
import { useBlockQuery, useLastBlockNumberQuery } from "../api/blockApi";
import BlockAddress from "../features/BlockAddress/BlockAddress";
import { useDisclosure } from "@mantine/hooks";

export function HomePage() {
  const [blockNumber, setBlockNumber] = useState<number | string>(0);
  const { data: lastBlockNumber } = useLastBlockNumberQuery();
  const { data: block, isLoading } = useBlockQuery(Number(blockNumber));
  const [mounted, mountedHandle] = useDisclosure(false);

  useEffect(() => {
    if (lastBlockNumber && blockNumber === 0) {
      setBlockNumber(lastBlockNumber);
    }
  }, [lastBlockNumber]);

  useEffect(() => {
    if (isLoading) {
      mountedHandle.close();
    } else {
      
      mountedHandle.open();
    }
  }, [block])


  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }} padding="md">
      <AppShell.Header withBorder={false}>
        <Group justify="space-between" h="100%" px="md">
          <ActionIcon component="a" href="/" variant="transparent">
            <IconCube size={30} />
          </ActionIcon>
          <ColorThemeSwitcher />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Stack gap={"xl"} align="center">
          <Stack justify="center" align="center">
            <Title ff={"mono"} lts={10}>show me the block</Title>
            <Group justify="center">
              <ActionIcon variant="subtle">
                <IconArrowLeft />
              </ActionIcon>
              <NumberInput
                placeholder="Enter a numer"
                rightSection={<></>}
                variant="unstyled"
                autoFocus
                size="xl"
                min={1}
                prefix="#"
                w={"auto"}
                value={blockNumber}
                onChange={setBlockNumber}
              />
              <ActionIcon variant="subtle">
                <IconArrowRight />
              </ActionIcon>
            </Group>
          </Stack>
          {
            isLoading && <Loader />
          }
          {
            block &&
            <Transition
              mounted={mounted}
              transition="slide-right"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => <div style={styles}>
                <Card withBorder radius={"lg"} shadow="md">
                  <Card.Section inheritPadding py={"md"} withBorder>
                    <Group justify="space-between">
                      <Title order={3}>Block #{block.number}</Title>
                      <BlockAddress number={block.number} label="View in explorer" />
                    </Group>
                  </Card.Section>
                  <Stack my={"xl"}>
                    <Group justify="space-between">
                      <Text>Miner</Text>
                    </Group>
                  </Stack>
                </Card>
              </div>}
            </Transition>
          }
        </Stack>
      </AppShell.Main>
      <AppShell.Footer withBorder={false}>
        <Group h={"100%"} justify="center">
          <Text size="sm">2024 nfpsaraiva</Text>
        </Group>
      </AppShell.Footer>
    </AppShell >
  );
}
