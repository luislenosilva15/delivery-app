import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import type { IconType } from "react-icons";

interface Props {
  icon: IconType["arguments"];
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, isActive, onClick }: Props) => {
  const textColor = useColorModeValue("gray.800", "gray.100");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex
      align="center"
      p={2}
      w="full"
      borderRadius="md"
      _hover={{ bg: hoverBg }}
      cursor="pointer"
      onClick={onClick}
      bg={isActive ? `${hoverBg}` : "transparent"}
    >
      <Icon as={icon} mr={2} color={textColor} fontSize="18px" />
      <Text color={textColor}>{label}</Text>
    </Flex>
  );
};

export default SidebarItem;
