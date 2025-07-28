/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import SidebarContent from "./Content";

export default function Sidebar({ children }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh">
      <IconButton
        display={{ base: "block", md: "none" }}
        onClick={onOpen}
        icon={<FiMenu />}
        aria-label="Abrir menu"
        variant="ghost"
        m={4}
      />

      <Box
        display={{ base: "none", md: "block" }}
        w="250px"
        pos="fixed"
        h="full"
        bg={useColorModeValue("white", "gray.800")}
        borderRightWidth="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        p={4}
      >
        <SidebarContent />
      </Box>

      {/* Sidebar mobile */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <Box
            w="full"
            h="full"
            bg={useColorModeValue("white", "gray.800")}
            p={4}
          >
            <SidebarContent />
          </Box>
        </DrawerContent>
      </Drawer>

      {/* Conteúdo principal */}
      <Box ml={{ md: "250px" }} p={6}>
        {children}
      </Box>
    </Box>
  );
}
