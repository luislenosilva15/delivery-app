// routes/PrivateLayout.tsx
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export const PrivateLayout = () => {
  return (
    <Box>
      <Sidebar>
        <Box ml={{ base: 0, md: "250px" }} transition="margin-left 0.3s ease">
          <Flex direction="column">
            <Header />
            <Box as="main" flex="1" p={4} overflowY="auto">
              <Outlet />
            </Box>
          </Flex>
        </Box>
      </Sidebar>
    </Box>
  );
};
