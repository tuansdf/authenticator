import { createTheme, MantineProvider as AMantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";

const theme = createTheme({});

export const MantineProvider = ({ children }: PropsWithChildren) => {
  return <AMantineProvider theme={theme}>{children}</AMantineProvider>;
};
