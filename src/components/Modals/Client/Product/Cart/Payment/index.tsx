import {
  Box,
  Collapse,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FaCreditCard,
  FaMoneyBillWave,
  FaQrcode,
  FaUniversity,
  FaUtensils,
} from "react-icons/fa";
import type { CartPaymentProps } from "./types";
import type { Payment, SubPayment } from "../types";
import { useClient } from "@/hook/client";
import { paymentCardBrandTypes, paymentVoucherBrandTypes } from "@/constants";

const CartPayment = ({
  payment,
  subPayment,
  onChangeSubPayment,
  onChangePayment,
  error,
}: CartPaymentProps) => {
  const { company } = useClient();
  return (
    <Box borderWidth="1px" rounded="md" p={4} mt={4}>
      <Text mb={3} fontWeight="semibold" fontSize="lg">
        Método de pagamento
      </Text>
      <RadioGroup
        onChange={(v) => {
          onChangePayment(v as Payment);
          onChangeSubPayment(null);
        }}
        value={payment as string}
      >
        <Stack direction="column" spacing={3}>
          {company?.paymentMethodAvailable?.includes("CREDIT_CARD") && (
            <Box>
              <Radio value="CREDIT_CARD" colorScheme="primary">
                <HStack spacing={2}>
                  <FaCreditCard /> <Text>Cartão de Crédito</Text>
                </HStack>
              </Radio>
              <Collapse in={payment === "CREDIT_CARD"} animateOpacity>
                <Box pl={8} pt={2}>
                  <RadioGroup
                    onChange={(e) => onChangeSubPayment(e as SubPayment)}
                    value={subPayment as string}
                  >
                    <Stack direction="column" spacing={2}>
                      {company?.paymentCardBrand.map((brand) => (
                        <Radio key={brand} value={brand}>
                          {paymentCardBrandTypes[brand]}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </Box>
              </Collapse>
            </Box>
          )}

          {company?.paymentMethodAvailable?.includes("DEBIT_CARD") && (
            <Box>
              <Radio value="DEBIT_CARD" colorScheme="primary">
                <HStack spacing={2}>
                  <FaUniversity /> <Text>Cartão de Débito</Text>
                </HStack>
              </Radio>
              <Collapse in={payment === "DEBIT_CARD"} animateOpacity>
                <Box pl={8} pt={2}>
                  <RadioGroup
                    onChange={(e) => onChangeSubPayment(e as SubPayment)}
                    value={subPayment as string}
                  >
                    <Stack direction="column" spacing={2}>
                      {company?.paymentCardBrand.map((brand) => (
                        <Radio key={brand} value={brand}>
                          {paymentCardBrandTypes[brand]}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </Box>
              </Collapse>
            </Box>
          )}

          {company?.paymentMethodAvailable?.includes("VOUCHER") && (
            <Box>
              <Radio value="VOUCHER" colorScheme="primary">
                <HStack spacing={2}>
                  <FaUtensils /> <Text>Vale Refeição</Text>
                </HStack>
              </Radio>
              <Collapse in={payment === "VOUCHER"} animateOpacity>
                <Box pl={8} pt={2}>
                  <RadioGroup
                    onChange={(e) => onChangeSubPayment(e as SubPayment)}
                    value={subPayment as string}
                  >
                    <Stack direction="column" spacing={2}>
                      {company?.paymentVoucherBrand.map((brand) => (
                        <Radio key={brand} value={brand}>
                          {paymentVoucherBrandTypes[brand]}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </Box>
              </Collapse>
            </Box>
          )}

          {company?.paymentMethodAvailable?.includes("CASH") && (
            <Box>
              <Radio value="CASH" colorScheme="primary">
                <HStack spacing={2}>
                  <FaMoneyBillWave /> <Text>Dinheiro</Text>
                </HStack>
              </Radio>
            </Box>
          )}

          {company?.paymentMethodAvailable?.includes("PIX") && (
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
