import { useOtpStore } from "@/stores/otp.store.ts";
import { Box, Button, Flex, TextInput } from "@mantine/core";
import { FormEvent, useState } from "react";

type Props = {
  onSuccess?: () => any;
};

export const AddOtp = ({ onSuccess }: Props) => {
  const add = useOtpStore((state) => state.add);
  const [name, setName] = useState("");
  const [secret, setSecret] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    add({ id: Math.random(), name, secret });
    setName("");
    setSecret("");
    onSuccess?.();
  };

  return (
    <Box component="form" mt="0.5rem" onSubmit={handleSubmit}>
      <TextInput
        onChange={(e) => setSecret(e.target.value)}
        value={secret}
        label="Secret"
        mb="0.25rem"
      />
      <TextInput
        onChange={(e) => setName(e.target.value)}
        value={name}
        label="Display name"
      />
      <Flex justify="flex-end">
        <Button type="submit" mt="1rem">
          Submit
        </Button>
      </Flex>
    </Box>
  );
};
