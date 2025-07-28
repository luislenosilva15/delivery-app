"use client";

import { Button } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";

export const App = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Button variant="outline" onClick={toggleColorMode}>
      Toggle Mode
    </Button>
  );
};
