import {
  Box,
  VStack,
  Text,
  Heading,
  Button,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Props = {
  message: string;
  title?: string;
  actionLabel?: string;
  onAction?: () => void;
};

const Error: React.FC<Props> = ({
  message,
  title = "Ops!",
  actionLabel = "Voltar",
  onAction,
}: Props) => {
  const navigate = useNavigate();

  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={6}
    >
      <VStack
        spacing={4}
        bg={bg}
        p={6}
        borderRadius="md"
        boxShadow="md"
        maxW="640px"
        textAlign="center"
      >
        <Icon as={FaExclamationTriangle} boxSize={10} color="red.400" />
        <Heading size="md" color={textColor}>
          {title}
        </Heading>
        <Text color="gray.500">{message}</Text>
        <Button
          leftIcon={<FaArrowLeft />}
          colorScheme="primary"
          onClick={() => (onAction ? onAction() : navigate(-1))}
        >
          {actionLabel}
        </Button>
      </VStack>
    </Box>
  );
};

export default Error;
