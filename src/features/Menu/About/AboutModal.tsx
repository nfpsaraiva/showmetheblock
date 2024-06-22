import { Modal, Text } from "@mantine/core";
import { FC } from "react";

interface AboutModalProps {
  opened: boolean,
  close: () => void
}

const AboutModal: FC<AboutModalProps> = ({
  opened,
  close
}: AboutModalProps) => {
  return (
    <Modal opened={opened} onClose={close} title="About">
      <Text>
        User-friendly tool designed to provide insights into the Ethereum blockchain.
        The app lets you search for a block number, view the total transactions as well as the total value transacted.
      </Text>
    </Modal>
  )
}

export default AboutModal;