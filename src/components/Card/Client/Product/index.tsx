import type { TProduct } from "@/store/features/menu/types/models";
import { Box, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ProductCardEmptyState from "./emptyState";

const MotionBox = motion(Box);

const ProductCard = ({
  product,
  onClick,
}: {
  product: TProduct;
  onClick: VoidFunction;
}) => {
  const hasImage = product.image && product.image.length > 0;

  return (
    <MotionBox
      key={product.id}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      shadow="md"
      display="flex"
      flexDirection="column"
      height="100%"
      whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      cursor={"pointer"}
      onClick={onClick}
    >
      {hasImage ? (
        <Box mb={2} borderRadius="md" overflow="hidden">
          <Image
            src={product.image as string}
            alt={product.name}
            width="100%"
            height="auto"
            objectFit="cover"
            aspectRatio={16 / 9}
          />
        </Box>
      ) : (
        <ProductCardEmptyState />
      )}
      <Box flexGrow={1}>
        <Text fontWeight="semibold" fontSize="lg" mb={1}>
          {product.name}
        </Text>
        <Text fontSize="sm" color="gray.600" mb={2} flexGrow={1}>
          {product.description}
        </Text>
      </Box>
      <Text fontWeight="bold" fontSize="md" color="green.500">
        R$ {product.price.toFixed(2).replace(".", ",")}
      </Text>
    </MotionBox>
  );
};

export default ProductCard;
