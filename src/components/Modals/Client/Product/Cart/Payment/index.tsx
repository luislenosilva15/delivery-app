import {
  Box,
  Collapse,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaCreditCard,
  FaMoneyBillWave,
  FaQrcode,
  FaUniversity,
  FaUtensils,
} from "react-icons/fa";
import type { CartPaymentProps } from "./types";
import { useClient } from "@/hook/client";
import { paymentCardBrandTypes, paymentVoucherBrandTypes } from "@/constants";
import type {
  TPaymentCardBrand,
  TPaymentDebitBrand,
  TPaymentMethod,
  TPaymentVoucherBrand,
} from "@/store/features/auth/types/models";

const CartPayment = ({
  payment,
  subPayment,
  onChangeSubPayment,
  onChangePayment,
  error,
}: CartPaymentProps) => {
  const { company } = useClient();
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box borderWidth="1px" rounded="md" p={4} mt={4} borderColor={borderColor}>
      <Text mb={3} fontWeight="semibold" fontSize="lg">
        Método de pagamento
      </Text>
      <RadioGroup
        onChange={(v) => {
          onChangePayment(v as TPaymentMethod);
          onChangeSubPayment(null);
        }}
        value={payment as string}
      >
        <Stack direction="column" spacing={3}>
          {company?.companyPayment?.method?.includes("CREDIT_CARD") && (
            <Box>
              <Radio value="CREDIT_CARD" colorScheme="primary">
                <HStack spacing={2}>
                  <FaCreditCard /> <Text>Cartão de Crédito</Text>
                </HStack>
              </Radio>
              <Collapse in={payment === "CREDIT_CARD"} animateOpacity>
                <Box pl={8} pt={2}>
                  <RadioGroup
                    onChange={(e) =>
                      onChangeSubPayment(e as TPaymentCardBrand | null)
                    }
                    value={subPayment as string}
                  >
                    <Stack direction="column" spacing={2}>
                      {company?.companyPayment?.cardBrand.map((brand) => (
                        <Radio key={brand} value={brand} colorScheme="primary">
                          {paymentCardBrandTypes[brand]}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </Box>
              </Collapse>
            </Box>
          )}

          {company?.companyPayment?.method?.includes("DEBIT_CARD") && (
            <Box>
              <Radio value="DEBIT_CARD" colorScheme="primary">
                <HStack spacing={2}>
                  <FaUniversity /> <Text>Cartão de Débito</Text>
                </HStack>
              </Radio>
              <Collapse in={payment === "DEBIT_CARD"} animateOpacity>
                <Box pl={8} pt={2}>
                  <RadioGroup
                    onChange={(e) =>
                      onChangeSubPayment(e as TPaymentDebitBrand | null)
                    }
                    value={subPayment as string}
                  >
                    <Stack direction="column" spacing={2}>
                      {company?.companyPayment?.debitCardBrand.map((brand) => (
                        <Radio key={brand} value={brand} colorScheme="primary">
                          {paymentCardBrandTypes[brand]}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </Box>
              </Collapse>
            </Box>
          )}

          {company?.companyPayment?.method?.includes("VOUCHER") && (
            <Box>
              <Radio value="VOUCHER" colorScheme="primary">
                <HStack spacing={2}>
                  <FaUtensils /> <Text>Vale Refeição</Text>
                </HStack>
              </Radio>
              <Collapse in={payment === "VOUCHER"} animateOpacity>
                <Box pl={8} pt={2}>
                  <RadioGroup
                    onChange={(e) =>
                      onChangeSubPayment(e as TPaymentVoucherBrand | null)
                    }
                    value={subPayment as string}
                  >
                    <Stack direction="column" spacing={2}>
                      {company?.companyPayment?.voucherBrand.map((brand) => (
                        <Radio key={brand} value={brand} colorScheme="primary">
                          {paymentVoucherBrandTypes[brand]}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </Box>
              </Collapse>
            </Box>
          )}

          {company?.companyPayment?.method?.includes("CASH") && (
            <Box>
              <Radio value="CASH" colorScheme="primary">
                <HStack spacing={2}>
                  <FaMoneyBillWave /> <Text>Dinheiro</Text>
                </HStack>
              </Radio>
            </Box>
          )}

          {company?.companyPayment?.method?.includes("PIX") && (
            <Box>
              <Radio value="PIX" colorScheme="primary">
                <HStack spacing={2}>
                  <FaQrcode /> <Text>Pix</Text>
                </HStack>
              </Radio>
            </Box>
          )}
        </Stack>
      </RadioGroup>
      {error.payment && (
        <Text color="red.500" fontSize="sm" mt={2}>
          {error.payment}
        </Text>
      )}
    </Box>
  );
};

export default CartPayment;
