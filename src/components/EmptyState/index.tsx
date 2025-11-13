import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import type { ReactNode } from "react";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  size?: "sm" | "md" | "lg";
  padded?: boolean;
}

const sizeMap = {
  sm: { py: 8, iconSize: 48, titleSize: "sm", descFontSize: "sm" },
  md: { py: 12, iconSize: 72, titleSize: "md", descFontSize: "sm" },
  lg: { py: 16, iconSize: 96, titleSize: "lg", descFontSize: "md" },
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  size = "sm",
  padded = true,
}: EmptyStateProps) {
  const { py, titleSize, descFontSize } = sizeMap[size];
  const titleColor = useColorModeValue("gray.600", "gray.300");
  const descColor = useColorModeValue("gray.500", "gray.400");
  const iconColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="full"
      py={py}
      px={padded ? 4 : 0}
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="md"
    >
      {icon && (
        <Box mb={6} color={iconColor} fontSize={sizeMap[size].iconSize + "px"}>
          {icon}
        </Box>
      )}
      <Heading size={titleSize} mb={2} color={titleColor} fontWeight="bold">
        {title}
      </Heading>
      {description && (
        <Text
          color={descColor}
          maxW="420px"
          textAlign="center"
          fontSize={descFontSize}
          mb={action ? 4 : 0}
        >
          {description}
        </Text>
      )}
      {action && <Box mt={2}>{action}</Box>}
    </Flex>
  );
}

export default EmptyState;
