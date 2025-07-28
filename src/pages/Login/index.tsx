import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export default function LoginPage() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <IconButton
        aria-label="Alternar tema"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        position="fixed"
        top={4}
        right={4}
      />
      <Stack spacing={8} mx="auto" maxW="lg" w="full" py={12} px={6}>
        <Stack align="center">
          <Heading
            fontSize="4xl"
            color={useColorModeValue("gray.800", "white")}
          >
            Entrar na sua conta
          </Heading>
          <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
            para acessar o painel ✌️
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
                Email
              </FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
                Senha
              </FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Button bg="blue.400" color="white" _hover={{ bg: "blue.500" }}>
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
