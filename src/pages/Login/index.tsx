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
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  setAuthValidRequest,
  setLoginRequest,
  type AuthState,
} from "@/store/features/auth/authSlice";
import PageLoading from "@/components/PageLoading";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, autenticated, isSubmitting } = useSelector(
    (state: { auth: AuthState }) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const labelColor = useColorModeValue("gray.700", "gray.200");
  const boxBg = useColorModeValue("white", "gray.700");

  const disabledSubmitButton = !email.length || !password.length;

  useEffect(() => {
    dispatch(setAuthValidRequest());

    if (autenticated) navigate("/");
  }, [autenticated, dispatch, navigate]);

  const onLogin = () => {
    dispatch(
      setLoginRequest({
        email,
        password,
      })
    );
  };

  if (loading) return <PageLoading />;

  return (
    <Flex minH="100vh" align="center" justify="center" bg={bgColor}>
      <Stack spacing={8} mx="auto" maxW="lg" w="full" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" color={headingColor}>
            Entrar na sua conta
          </Heading>
          <Text fontSize="lg" color={textColor}>
            para acessar o painel ✌️
          </Text>
        </Stack>
        <Box rounded="lg" bg={boxBg} boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel color={labelColor}>Email</FormLabel>
              <Input onChange={(e) => setEmail(e.target.value)} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel color={labelColor}>Senha</FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                isLoading={isSubmitting}
                onClick={onLogin}
                bg="primary.400"
                color="white"
                _hover={{ bg: "primary.500" }}
                disabled={disabledSubmitButton}
              >
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
