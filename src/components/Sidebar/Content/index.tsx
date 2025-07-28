import {
  Box,
  Collapse,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import SidebarItem from "../Item";
import {
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiFile,
  FiFileText,
  FiHelpCircle,
  FiHome,
  FiSettings,
  FiStar,
} from "react-icons/fi";

function SidebarContent() {
  const [docOpen, setDocOpen] = useState(false);

  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const activeBg = useColorModeValue("teal.100", "teal.700");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const mutedText = useColorModeValue("gray.600", "gray.400");

  return (
    <Flex direction="column" h="100%">
      <Box mb={6}>
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          Logo
        </Text>
      </Box>

      {/* Menu principal */}
      <VStack align="start" spacing={3}>
        <SidebarItem icon={FiHome} label="Dashboard" />
        <SidebarItem icon={FiFileText} label="Analysis" />

        <Box w="full">
          <Flex
            align="center"
            cursor="pointer"
            onClick={() => setDocOpen(!docOpen)}
            bg={docOpen ? activeBg : "transparent"}
            p={2}
            borderRadius="md"
            justify="space-between"
            _hover={{ bg: hoverBg }}
          >
            <Flex align="center">
              <Icon as={FiFile} mr={2} color={textColor} />
              <Text color={textColor}>Documents</Text>
            </Flex>
            <Icon
              as={docOpen ? FiChevronUp : FiChevronDown}
              color={textColor}
            />
          </Flex>
          <Collapse in={docOpen} animateOpacity>
            <VStack pl={6} align="start" mt={2} spacing={2}>
              <Text fontSize="sm" color={mutedText}>
                Resumes
              </Text>
              <Text fontSize="sm" color={mutedText}>
                Cover Letter
              </Text>
              <Text fontSize="sm" color={mutedText}>
                Personal
              </Text>
              <Text fontSize="sm" color={mutedText}>
                Education
              </Text>
            </VStack>
          </Collapse>
        </Box>

        <SidebarItem icon={FiClock} label="History" />
        <SidebarItem icon={FiStar} label="Favorites" />
      </VStack>

      <Box flex="1" />

      {/* Menu inferior */}
      <VStack align="start" spacing={3} mt={4}>
        <SidebarItem icon={FiHelpCircle} label="Help Center" />
        <SidebarItem icon={FiSettings} label="Settings" />
      </VStack>
    </Flex>
  );
}

export default SidebarContent;
