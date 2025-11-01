import {
  Box,
  Button,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "@/hook/auth";
import { useDispatch } from "react-redux";
import Breadcrumb from "@/components/Breadcrumb";
import type { CompanyAboutData } from "./types";
import ImageUploader from "@/components/ImageUploader";
import FormErrorInfo from "@/components/FormErrorInfo";
import { isValidPhone } from "@/utils/validations";
import { maskPhone } from "@/utils/mask";
import { setEditCompanyRequest } from "@/store/features/auth/authSlice";
import { cuisineTypes } from "@/constants";

const AboutPage = () => {
  const { company, isSubmitEditCompanyForm } = useAuth();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<CompanyAboutData>({
    email: company?.email || "",
    name: company?.name || "",
    legalName: company?.legalName || "",
    document: company?.document || "",
    phone: company?.phone || "",
    logoUrl: company?.logoUrl || "",
    address: company?.address || "",
    city: company?.city || "",
    state: company?.state || "",
    zipCode: company?.zipCode || "",
    logoFile: null,
    cuisineType: company?.cuisineType || "",
  });

  const [phoneError, setPhoneError] = useState<string | null>(null);

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

    if (!isValidPhone(formData.phone || "")) {
      setPhoneError("Digite um número com 9 dígitos após o DDD.");
      return;
    }

    dispatch(
      setEditCompanyRequest({
        id: company?.id as number,
        company: formData,
      })
    );
  };

  const breadcrumbLinks = [
    { label: "Home", href: "/" },
    { label: "Sobre a loja", isCurrent: true },
  ];

  return (
    <Box mx="auto" p={6}>
      <Breadcrumb links={breadcrumbLinks} />
      <Stack spacing={4}>
        <Heading size="md">Sobre a loja</Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <ImageUploader
                showRemoveButton={false}
                previewUrl={formData?.logoUrl}
                shape="square"
                onChange={(file: File | null) => {
                  setFormData((prev) => ({
                    ...prev,
                    logoFile: file,
                  }));
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                focusBorderColor="primary.500"
                onInvalid={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity(
                    "Obrigatório informar um email válido."
                  )
                }
                onInput={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity("")
                }
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Nome Fantasia</FormLabel>
              <Input
                focusBorderColor="primary.500"
                onInvalid={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity(
                    "Obrigatório informar o nome fantasia."
                  )
                }
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Razão Social</FormLabel>
              <Input
                focusBorderColor="primary.500"
                name="legalName"
                value={formData.legalName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Tipo de Cozinha</FormLabel>

              <Select
                focusBorderColor="primary.500"
                value={formData.cuisineType}
                placeholder="Selecione o tipo de cozinha"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    cuisineType: e.target.value,
                  }));
                }}
              >
                {cuisineTypes.map((cuisine) => (
                  <option key={cuisine.value} value={cuisine.value}>
                    {cuisine.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <FormControl>
                <FormLabel>CNPJ/CPF</FormLabel>
                <Input
                  focusBorderColor="primary.500"
                  name="document"
                  value={formData.document}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Telefone</FormLabel>
                <Input
                  focusBorderColor="primary.500"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(99) 99999-9999"
                />
                <FormErrorInfo>{phoneError}</FormErrorInfo>
              </FormControl>
            </Stack>

            <FormControl>
              <FormLabel>Endereço</FormLabel>
              <Input
                focusBorderColor="primary.500"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </FormControl>

            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <FormControl>
                <FormLabel>Cidade</FormLabel>
                <Input
                  focusBorderColor="primary.500"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <Input
                  focusBorderColor="primary.500"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>CEP</FormLabel>
                <Input
                  focusBorderColor="primary.500"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </FormControl>
            </Stack>

            <Button
              type="submit"
              colorScheme="primary"
              w="max-content"
              mt={2}
              isLoading={isSubmitEditCompanyForm}
              disabled={isSubmitEditCompanyForm}
            >
              Salvar
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default AboutPage;
