import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  Heading,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { useDeliverySettingsValidation } from "@/validations/delivery";
import type { FormData } from "./types";
import { useAuth } from "@/hook/auth";
import {
  PAYMENT_CARD,
  PAYMENT_VOUCHER,
  paymentCardBrandTypes,
  paymentVoucherBrandTypes,
} from "@/constants";
import { useDispatch } from "react-redux";
import { setEditDeliverySettingsRequest } from "@/store/features/auth/authSlice";

const DeliverySettingsPage = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    requireCpfCnpj: false,
    invoiceDocType: false,
    serviceOptions: [],
    paymentMethods: [],
    creditFlags: [],
    debitFlags: [],
    voucherFlags: [],
  });

  const { errors, validate } = useDeliverySettingsValidation({
    ...formData,
  });

  const handleChange = <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!company) return null;
    e.preventDefault();
    if (validate()) {
      dispatch(
        setEditDeliverySettingsRequest({
          availability: formData.serviceOptions,
          companyPayment: {
            method: formData.paymentMethods,
            cardBrand: formData.creditFlags,
            debitCardBrand: formData.debitFlags,
            voucherBrand: formData.voucherFlags,
            requiredDocument: formData.requireCpfCnpj,
            documentInTicket: formData.invoiceDocType,
          },
          companyId: company?.id,
        })
      );
    }
  };

  const breadcrumbLinks = [
    { label: "Home", href: "/" },
    { label: "Configurações", isCurrent: true },
  ];

  const { company, loading } = useAuth();

  useEffect(() => {
    if (company) {
      setFormData((prev) => ({
        ...prev,
        paymentMethods: company?.companyPayment?.method,
        serviceOptions: company?.availability,
        debitFlags: company?.companyPayment?.debitCardBrand,
        creditFlags: company?.companyPayment?.cardBrand,
        voucherFlags: company?.companyPayment?.voucherBrand,
        requireCpfCnpj: company?.companyPayment?.requiredDocument,
        invoiceDocType: company?.companyPayment?.documentInTicket,
      }));
    }
  }, [company]);

  if (loading) {
    return (
      <Box w="100%" p={6} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box w="100%" p={6}>
      <Breadcrumb links={breadcrumbLinks} />
      <Stack spacing={8} w="100%">
        <Heading size="md">Configurações do Delivery</Heading>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Stack spacing={8} w="100%">
            {/* CPF/CNPJ */}
            <Box
              p={6}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="sm"
              w="100%"
            >
              <Heading size="md" mb={4}>
                Documento
              </Heading>
              <Stack spacing={4}>
                <FormControl>
                  <Checkbox
                    colorScheme="primary"
                    isChecked={formData.requireCpfCnpj}
                    onChange={(e) =>
                      handleChange("requireCpfCnpj", e.target.checked)
                    }
                  >
                    Obrigatório informar CPF/CNPJ
                  </Checkbox>
                </FormControl>

                <FormControl>
                  <Checkbox
                    colorScheme="primary"
                    isChecked={formData.invoiceDocType}
                    onChange={(e) =>
                      handleChange("invoiceDocType", e.target.checked)
                    }
                  >
                    Perguntar se o cliente deseja informar CPF/CNPJ na nota
                  </Checkbox>
                </FormControl>
              </Stack>
            </Box>

            {/* Serviço */}
            <Box
              p={6}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="sm"
              w="100%"
            >
              <Heading size="md" mb={4}>
                Formas de Atendimento
              </Heading>
              <FormControl isInvalid={!!errors.service}>
                <CheckboxGroup
                  colorScheme="primary"
                  value={formData.serviceOptions as string[]}
                  onChange={(val) =>
                    handleChange(
                      "serviceOptions",
                      val as FormData["serviceOptions"]
                    )
                  }
                >
                  <Stack spacing={2}>
                    <Checkbox value="LOCAL">Retirar no local</Checkbox>
                    <Checkbox value="DELIVERY">Delivery</Checkbox>
                  </Stack>
                </CheckboxGroup>
                <FormErrorMessage>{errors.service}</FormErrorMessage>
              </FormControl>
            </Box>

            {/* Pagamentos */}
            <Box
              p={6}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="sm"
              w="100%"
            >
              <Heading size="md" mb={4}>
                Formas de Pagamento
              </Heading>
              <FormControl isInvalid={!!errors.payment}>
                <CheckboxGroup
                  colorScheme="primary"
                  value={formData.paymentMethods as string[]}
                  onChange={(val) =>
                    handleChange(
                      "paymentMethods",
                      val as FormData["paymentMethods"]
                    )
                  }
                >
                  <Stack>
                    <Checkbox value="CASH">Dinheiro</Checkbox>
                    <Checkbox value="PIX">Pix</Checkbox>

                    <Accordion allowMultiple>
                      {/* Crédito */}
                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton px={0}>
                            <Checkbox
                              colorScheme="primary"
                              value="CREDIT_CARD"
                              isChecked={formData.paymentMethods.includes(
                                "CREDIT_CARD"
                              )}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const updatedMethods = checked
                                  ? [...formData.paymentMethods, "CREDIT_CARD"]
                                  : formData.paymentMethods.filter(
                                      (m) => m !== "CREDIT_CARD"
                                    );
                                handleChange(
                                  "paymentMethods",
                                  updatedMethods as FormData["paymentMethods"]
                                );
                                if (!checked) handleChange("creditFlags", []);
                              }}
                            >
                              Cartão de Crédito
                            </Checkbox>
                            <AccordionIcon ml="auto" />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pl={6}>
                          <FormControl isInvalid={!!errors.credit}>
                            <CheckboxGroup
                              colorScheme="primary"
                              value={formData.creditFlags as string[]}
                              onChange={(val) =>
                                handleChange(
                                  "creditFlags",
                                  val as FormData["creditFlags"]
                                )
                              }
                            >
                              <Stack spacing={2}>
                                {PAYMENT_CARD.map((value) => (
                                  <Checkbox
                                    key={value}
                                    value={value}
                                    isDisabled={
                                      !formData.paymentMethods.includes(
                                        "CREDIT_CARD"
                                      )
                                    }
                                  >
                                    {
                                      paymentCardBrandTypes[
                                        value as keyof typeof paymentCardBrandTypes
                                      ]
                                    }
                                  </Checkbox>
                                ))}
                              </Stack>
                            </CheckboxGroup>
                            <FormErrorMessage>{errors.credit}</FormErrorMessage>
                          </FormControl>
                        </AccordionPanel>
                      </AccordionItem>

                      {/* Débito */}
                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton px={0}>
                            <Checkbox
                              colorScheme="primary"
                              value="DEBIT_CARD"
                              isChecked={formData.paymentMethods.includes(
                                "DEBIT_CARD"
                              )}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const updatedMethods = checked
                                  ? [...formData.paymentMethods, "DEBIT_CARD"]
                                  : formData.paymentMethods.filter(
                                      (m) => m !== "DEBIT_CARD"
                                    );
                                handleChange(
                                  "paymentMethods",
                                  updatedMethods as FormData["paymentMethods"]
                                );
                                if (!checked) handleChange("debitFlags", []);
                              }}
                            >
                              Cartão de Débito
                            </Checkbox>
                            <AccordionIcon ml="auto" />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pl={6}>
                          <FormControl isInvalid={!!errors.debit}>
                            <CheckboxGroup
                              colorScheme="primary"
                              value={formData.debitFlags as string[]}
                              onChange={(val) =>
                                handleChange(
                                  "debitFlags",
                                  val as FormData["debitFlags"]
                                )
                              }
                            >
                              <Stack spacing={2}>
                                {PAYMENT_CARD.map((value) => (
                                  <Checkbox
                                    key={value}
                                    value={value}
                                    isDisabled={
                                      !formData.paymentMethods.includes(
                                        "DEBIT_CARD"
                                      )
                                    }
                                  >
                                    {
                                      paymentCardBrandTypes[
                                        value as keyof typeof paymentCardBrandTypes
                                      ]
                                    }
                                  </Checkbox>
                                ))}
                              </Stack>
                            </CheckboxGroup>
                            <FormErrorMessage>{errors.debit}</FormErrorMessage>
                          </FormControl>
                        </AccordionPanel>
                      </AccordionItem>

                      {/* Voucher */}
                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton px={0}>
                            <Checkbox
                              colorScheme="primary"
                              value="VOUCHER"
                              isChecked={formData.paymentMethods.includes(
                                "VOUCHER"
                              )}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const updatedMethods = checked
                                  ? [...formData.paymentMethods, "VOUCHER"]
                                  : formData.paymentMethods.filter(
                                      (m) => m !== "VOUCHER"
                                    );
                                handleChange(
                                  "paymentMethods",
                                  updatedMethods as FormData["paymentMethods"]
                                );
                                if (!checked) handleChange("voucherFlags", []);
                              }}
                            >
                              Vale Refeição
                            </Checkbox>
                            <AccordionIcon ml="auto" />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pl={6}>
                          <FormControl isInvalid={!!errors.voucher}>
                            <CheckboxGroup
                              colorScheme="primary"
                              value={formData.voucherFlags as string[]}
                              onChange={(val) =>
                                handleChange(
                                  "voucherFlags",
                                  val as FormData["voucherFlags"]
                                )
                              }
                            >
                              <Stack spacing={2}>
                                {PAYMENT_VOUCHER.map((value) => (
                                  <Checkbox
                                    key={value}
                                    value={value}
                                    isDisabled={
                                      !formData.paymentMethods.includes(
                                        "VOUCHER"
                                      )
                                    }
                                  >
                                    {
                                      paymentVoucherBrandTypes[
                                        value as keyof typeof paymentVoucherBrandTypes
                                      ]
                                    }
                                  </Checkbox>
                                ))}
                              </Stack>
                            </CheckboxGroup>
                            <FormErrorMessage>
                              {errors.voucher}
                            </FormErrorMessage>
                          </FormControl>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Stack>
                </CheckboxGroup>
                <FormErrorMessage>{errors.payment}</FormErrorMessage>
              </FormControl>
            </Box>

            <Button
              type="submit"
              colorScheme="primary"
              size="md"
              w="max-content"
            >
              Salvar
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default DeliverySettingsPage;
