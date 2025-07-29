import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="4"
      bg={useColorModeValue("white", "gray.800")}
      position="sticky"
      top="0"
      zIndex="10"
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Text fontSize="lg" fontWeight="bold">
        Nome da Empresa
      </Text>

      <Flex align="center" gap={4}>
        <IconButton
          aria-label="Alternar tema"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          size="sm"
        />
      </Flex>
    </Flex>
  );
};

export default Header;
