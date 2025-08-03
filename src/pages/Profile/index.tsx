import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import type { ProfileData } from "./types";
import { useAuth } from "@/hook/auth";
import ImageUploader from "@/components/ImageUploader";
import { maskPhone } from "@/utils/mask";
import { isValidPassword, isValidPhone } from "@/utils/validations";
import FormErrorInfo from "@/components/FormErrorInfo";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const Profile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState<ProfileData>({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    image: user?.imageUrl || "",
    imageFile: null,
    password: "",
  });

  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const maskedValue = name === "phone" ? maskPhone(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: maskedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPhone(formData.phone)) {
      setPhoneError("Digite um número com 9 dígitos após o DDD.");
      return;
    }

    if (isValidPassword(formData.password)) {
      setPasswordError("Senha precisa de pelo menos 6 dígitos.");
      return;
    }

    setPhoneError(null);
    setPasswordError(null);
    console.log(formData);
  };

  return (
    <Box mx="auto" p={8}>
      <Stack spacing={6}>
        <Heading size="lg">Editar Perfil</Heading>

        <form onSubmit={handleSubmit}>
          <ImageUploader
            previewUrl={user?.imageUrl}
            onChange={(file: File) => {
              setFormData((prev) => ({
                ...prev,
                imageFile: file,
              }));
            }}
          />

          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <Flex align="center" mb={1}>
                <FormLabel mb="0">Email</FormLabel>
                <Tooltip
                  label="Email não pode ser alterado"
                  fontSize="xs"
                  placement="right"
                >
                  <InfoOutlineIcon
                    color="gray.400"
                    cursor="pointer"
                    fontSize="14px"
                  />
                </Tooltip>
              </Flex>
              <Input
                disabled
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Telefone</FormLabel>
              <Input
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                placeholder="(99) 99999-9999"
              />

              <FormErrorInfo>{phoneError}</FormErrorInfo>
            </FormControl>

            <FormControl>
              <FormLabel>Nova senha</FormLabel>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <FormErrorInfo>{passwordError}</FormErrorInfo>
            </FormControl>

            <Button type="submit" colorScheme="primary" w="max-content" mt={2}>
              Salvar
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default Profile;
