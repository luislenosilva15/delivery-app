import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  HStack,
  Text,
  Image,
  Badge,
  Box,
  Divider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiClock,
  FiPhone,
  FiMapPin,
  FiMail,
  FiCreditCard,
} from "react-icons/fi";
import { cuisineLabel } from "@/utils/typeNormalize";
import type { TCompany } from "@/store/features/auth/types/models";

interface CompanyInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: TCompany;
}

const CompanyInfoModal = ({
  isOpen,
  onClose,
  company,
}: CompanyInfoModalProps) => {
  // Cores para modo claro/escuro
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");
  const iconColor = useColorModeValue("gray.500", "gray.400");
  const dividerColor = useColorModeValue("gray.200", "gray.600");

  const getDayName = (dayOfWeek: number): string => {
    const days = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    return days[dayOfWeek] || "Dia inválido";
  };

  const getPaymentMethodLabel = (method: string): string => {
    const labels: Record<string, string> = {
      CREDIT_CARD: "Cartão de Crédito",
      DEBIT_CARD: "Cartão de Débito",
      PIX: "PIX",
      CASH: "Dinheiro",
      VOUCHER: "Vale Refeição",
    };
    return labels[method] || method;
  };

  const formatOpeningHours = () => {
    if (!company.openingHours || company.openingHours.length === 0) {
      return (
        <Text fontSize="sm" color={subtitleColor}>
          Horários não informados
        </Text>
      );
    }

    return company.openingHours.map((hour, index) => (
      <HStack key={index} spacing={2} justify="space-between" w="full">
        <Text fontSize="sm" fontWeight="medium" color={textColor}>
          {getDayName(hour.dayOfWeek)}:
        </Text>
        <Text fontSize="sm" color={subtitleColor}>
          {hour.closed ? "Fechado" : `${hour.startTime} - ${hour.endTime}`}
        </Text>
      </HStack>
    ));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent mx={4} bg={bg}>
        <ModalHeader pb={2}>
          <VStack spacing={3} align="center">
            <Image
              src={company.logoUrl}
              alt={`Logo ${company.name}`}
              boxSize="80px"
              borderRadius="full"
              objectFit="cover"
            />
            <VStack spacing={1} textAlign="center">
              <Text fontSize="xl" fontWeight="bold" color={textColor}>
                {company.name}
              </Text>
              <HStack spacing={2}>
                <Badge colorScheme="gray" fontSize="xs">
                  {cuisineLabel[company.cuisineType]}
                </Badge>
                <Badge
                  colorScheme={company.isOpen ? "green" : "red"}
                  fontSize="xs"
                >
                  {company.isOpen ? "Aberto agora" : "Fechado"}
                </Badge>
              </HStack>
            </VStack>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            {/* Horários de Funcionamento */}
            <Box>
              <HStack spacing={2} mb={3}>
                <Icon as={FiClock} color={iconColor} />
                <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                  Horários de Funcionamento
                </Text>
              </HStack>
              <VStack spacing={2} pl={6} align="stretch">
                {formatOpeningHours()}
              </VStack>
            </Box>

            <Divider borderColor={dividerColor} />

            {/* Informações de Contato */}
            <VStack spacing={3} align="stretch">
              {company.phone && (
                <Box>
                  <HStack spacing={2}>
                    <Icon as={FiPhone} color={iconColor} />
                    <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                      Telefone
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color={subtitleColor} pl={6}>
                    {company.phone}
                  </Text>
                </Box>
              )}

              {company.email && (
                <Box>
                  <HStack spacing={2}>
                    <Icon as={FiMail} color={iconColor} />
                    <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                      E-mail
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color={subtitleColor} pl={6}>
                    {company.email}
                  </Text>
                </Box>
              )}

              {(company.address || company.city) && (
                <Box>
                  <HStack spacing={2}>
                    <Icon as={FiMapPin} color={iconColor} />
                    <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                      Endereço
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color={subtitleColor} pl={6}>
                    {[company.address, company.city, company.state]
                      .filter(Boolean)
                      .join(", ")}
                    {company.zipCode && ` - CEP: ${company.zipCode}`}
                  </Text>
                </Box>
              )}
            </VStack>

            {/* Métodos de Pagamento */}
            {company.companyPayment && (
              <>
                <Divider borderColor={dividerColor} />
                <Box>
                  <HStack spacing={2} mb={3}>
                    <Icon as={FiCreditCard} color={iconColor} />
                    <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                      Formas de Pagamento
                    </Text>
                  </HStack>
                  <VStack spacing={3} pl={6} align="stretch">
                    {/* Métodos de Pagamento Aceitos */}
                    <Box>
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        color={textColor}
                        mb={2}
                      >
                        Métodos Aceitos:
                      </Text>
                      <VStack spacing={1} align="stretch">
                        {company.companyPayment.method.map((method, index) => (
                          <HStack key={index} spacing={2}>
                            <Badge
                              colorScheme="green"
                              variant="subtle"
                              size="sm"
                            >
                              {getPaymentMethodLabel(method)}
                            </Badge>
                          </HStack>
                        ))}
                      </VStack>
                    </Box>

                    {/* Informações Adicionais de Pagamento */}
                    <VStack spacing={1} align="stretch">
                      {company.companyPayment.requiredDocument && (
                        <HStack justify="space-between">
                          <Text fontSize="sm" color={subtitleColor}>
                            Documento obrigatório:
                          </Text>
                          <Badge
                            colorScheme="yellow"
                            variant="subtle"
                            size="sm"
                          >
                            Sim
                          </Badge>
                        </HStack>
                      )}
                      {company.companyPayment.documentInTicket && (
                        <HStack justify="space-between">
                          <Text fontSize="sm" color={subtitleColor}>
                            CPF na nota:
                          </Text>
                          <Badge colorScheme="green" variant="subtle" size="sm">
                            Disponível
                          </Badge>
                        </HStack>
                      )}
                    </VStack>
                  </VStack>
                </Box>
              </>
            )}

            {/* Informações Adicionais */}
            <Divider borderColor={dividerColor} />
            <Box>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color={textColor}
                mb={2}
              >
                Informações Adicionais
              </Text>
              <VStack spacing={2} pl={4} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="sm" color={subtitleColor}>
                    Disponibilidade:
                  </Text>
                  <Text fontSize="sm" fontWeight="medium" color={textColor}>
                    {company.availability.includes("DELIVERY") &&
                    company.availability.includes("LOCAL")
                      ? "Delivery e Retirada"
                      : company.availability.includes("DELIVERY")
                      ? "Apenas Delivery"
                      : "Apenas Retirada"}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CompanyInfoModal;
