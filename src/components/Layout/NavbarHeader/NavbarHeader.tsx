import { ActionIcon, Group, Title } from "@mantine/core";
import { IconLayoutSidebar } from "@tabler/icons-react";
import { FC } from "react";

const NavbarHeader: FC = () => {
    return (
        <Group h={"100%"} justify="space-between">
            <Title order={2} size={"h3"}>
                Options
            </Title>
            <ActionIcon variant="transparent">
                <IconLayoutSidebar />
            </ActionIcon>
        </Group>
    )
}

export default NavbarHeader;