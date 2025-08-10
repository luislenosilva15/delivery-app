import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Stack,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import type { Props } from "./types";
import { profiles } from "@/contants";
import FormErrorInfo from "@/components/FormErrorInfo";
import { isValidEmail } from "@/utils/validations";
import type { TTeamRole } from "@/store/features/team/types/models";

export default function CreateTeamModal({
  isOpen,
  onClose,
  onSubmit,
  mode = "create",
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<TTeamRole>("ADMIN");

  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleOnClose = () => {
    setName("");
    setEmail("");
    setProfile("ADMIN");
    setEmailError(false);
    setNameError(false);
    onClose();
  };

  const handleSubmit = () => {
    if (mode === "create") {
      setEmailError(false);
      setNameError(false);

      if (!isValidEmail(email)) {
        setEmailError(true);
        return;
      }

      if (!name) {
        setNameError(true);
        return;
      }
    }

    onSubmit({
      email,
      name,
      role: profile,
    });

    handleOnClose();
  };

  const textDescriptionColor = useColorModeValue("gray.800", "gray.200");
  const borderColor = useColorModeValue("gray.200", "gray.500");
  const hoverBg = useColorModeValue("gray.100", "gray.600");

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleOnClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {mode === "create" ? "Novo usuário" : "Editar permissões"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {mode === "create" && (
              <>
                <FormControl mb={4} isRequired>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    focusBorderColor="primary.500"
                    placeholder="Digite o nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {nameError && (
                    <FormErrorInfo>Campo obrigatório</FormErrorInfo>
                  )}
                </FormControl>

                <FormControl mb={6} isRequired>
                  <FormLabel>E-mail</FormLabel>
                  <Input
                    focusBorderColor="primary.500"
                    type="email"
                    placeholder="Digite o e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && <FormErrorInfo>E-mail inválido</FormErrorInfo>}
                </FormControl>
              </>
            )}
            <FormControl as="fieldset">
              {mode === "create" && (
                <FormLabel as="legend" fontWeight="bold" mb={3}>
                  Perfil de permissões
                </FormLabel>
              )}

              <RadioGroup
                value={profile}
                onChange={(val) => setProfile(val as TTeamRole)}
              >
                <Stack spacing={3}>
                  {profiles.map(({ value, label, description }) => {
                    const isSelected = profile === value;

                    return (
                      <Box
                        key={value}
                        borderWidth={1}
                        borderColor={isSelected ? "primary.500" : borderColor}
                        borderRadius="md"
                        p={3}
                        cursor="pointer"
                        transition="all 0.3s ease"
                        _hover={{
                          bg: hoverBg,
                          boxShadow: "md",
                          borderColor: isSelected
                            ? "primary.600"
                            : "primary.500",
                        }}
                        onClick={() => setProfile(value)}
                        userSelect="none"
                      >
                        <Radio
                          value={value}
                          mb={1}
                          colorScheme="primary"
                          transition="all 0.3s ease"
                        >
                          {label}
                        </Radio>
                        <Text fontSize="sm" color={textDescriptionColor} pl={6}>
                          {description}
                        </Text>
                      </Box>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} variant="outline">
              Cancelar
            </Button>
            <Button colorScheme="primary" onClick={handleSubmit}>
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
