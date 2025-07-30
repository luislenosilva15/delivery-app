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

export default function Sidebar({ children }: React.PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Box display={{ base: "block", md: "none" }}>
        <IconButton
          onClick={onOpen}
          icon={<FiMenu />}
          aria-label="Abrir menu"
          variant="ghost"
          m={4}
        />
      </Box>

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

      <Box>{children}</Box>
    </Box>
  );
}
