import { AddOtp } from "@/components/add-otp.tsx";
import { OtpList } from "@/components/otp-list.tsx";
import { MantineProvider } from "@/lib/mantine-provider.tsx";
import { Container, Tabs } from "@mantine/core";
import { useState } from "react";
import "@/utils/otp.util.ts";

export const App = () => {
  const [tab, setTab] = useState<string>("otps");

  return (
    <MantineProvider>
      <Container size="sm">
        <Tabs defaultValue="otps" value={tab} onChange={(tab) => setTab(tab || "otps")}>
          <Tabs.List>
            <Tabs.Tab value="otps">TOTPs</Tabs.Tab>
            <Tabs.Tab value="new">New</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="otps">{tab === "otps" && <OtpList />}</Tabs.Panel>
          <Tabs.Panel value="new">{tab === "new" && <AddOtp onSuccess={() => setTab("otps")} />}</Tabs.Panel>
        </Tabs>
      </Container>
    </MantineProvider>
  );
};
