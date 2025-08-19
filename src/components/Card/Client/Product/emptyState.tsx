import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import { MdFastfood } from "react-icons/md";

const ProductCardEmptyState = () => {
  return (
    <Box mb={6} borderRadius="md" overflow="hidden" width="100%">
      <VStack
        bg="gray.300"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="auto"
        aspectRatio={16 / 9}
        color="gray.400"
      >
        <Icon as={MdFastfood} w={12} h={12} />
        <Text fontSize="sm" fontWeight="medium">
          Sem Imagem
        </Text>
      </VStack>
    </Box>
  );
};

export default ProductCardEmptyState;
