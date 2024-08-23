import { OtpItem } from "@/components/otp-item.tsx";
import { useOtpStore } from "@/stores/otp.store.ts";
import { Box } from "@mantine/core";

export const OtpList = () => {
  const otps = useOtpStore((state) => state.otps);

  return (
    <Box mt="0.5rem">
      {otps.map((otp) => {
        return <OtpItem key={otp.id} name={otp.name} secret={otp.secret} />;
      })}
    </Box>
  );
};
