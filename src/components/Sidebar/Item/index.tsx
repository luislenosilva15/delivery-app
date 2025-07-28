import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import type { IconType } from "react-icons";

interface Props {
  icon: IconType["arguments"];
  label: string;
}

const SidebarItem = ({ icon, label }: Props) => {
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
    >
      <Icon as={icon} mr={2} color={textColor} />
      <Text color={textColor}>{label}</Text>
    </Flex>
  );
};

export default SidebarItem;
