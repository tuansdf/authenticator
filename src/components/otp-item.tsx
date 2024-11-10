import { createOtp } from "@/utils/otp.util.ts";
import { Box, Flex, RingProgress, Text } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

type Props = {
  name: string;
  secret: string;
};

export const OtpItem = ({ name, secret }: Props) => {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [label, setLabel] = useState("");

  const otpObj = useMemo(() => {
    return createOtp(secret);
  }, [secret]);

  useEffect(() => {
    if (!otpObj) return;

    setOtp(otpObj.generateToken());
    setSeconds(otpObj.getRemainingTime());
    const labels = [];
    if (otpObj.issuer) labels.push(otpObj.issuer);
    if (otpObj.label) labels.push(otpObj.label);
    setLabel(labels.join(" - "));

    const interval = setInterval(() => {
      setOtp(otpObj.generateToken());
      setSeconds(otpObj.getRemainingTime());
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [otpObj]);

  return (
    <Flex my="1rem">
      <RingProgress
        size={100}
        sections={[{ value: (seconds / otpObj.period) * 100, color: "blue" }]}
        label={
          <Flex justify="center" align="center">
            <Text c="blue" fw={600} ta="center" size="1.5rem">
              {seconds}
            </Text>
          </Flex>
        }
      />
      <Box pt="0" pb="0.5rem">
        <Text size="md" fw={600}>
          {label}
          {name && label ? ` (${name})` : name}
        </Text>
        <Text c="blue" fw={700} size="3rem">
          {otp}
        </Text>
      </Box>
    </Flex>
  );
};
