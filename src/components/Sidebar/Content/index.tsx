import {
  Box,
  Collapse,
  Flex,
  Icon,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import SidebarItem from "../Item";
import {
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiFileText,
  FiHelpCircle,
  FiHome,
  FiSettings,
  FiStar,
} from "react-icons/fi";

import { BiStore } from "react-icons/bi";

import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hook/auth";

function SidebarContent() {
  const [docOpen, setDocOpen] = useState(false);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { company } = useAuth();

  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const optionIsActive = useCallback(
    (route: string) => {
      return route === pathname;
    },
    [pathname]
  );

  if (!company) return null;

  return (
    <Flex direction="column" h="100%">
      <Box display="flex" justifyContent="center" mb={6}>
        <Image
          src={company.logoUrl}
          alt="logo"
          w="200px"
          height="80px"
          objectFit="contain"
        />
      </Box>

      <VStack align="start" spacing={3}>
        <SidebarItem
          icon={FiHome}
          label="Início"
          isActive={optionIsActive("/")}
          onClick={() => navigate("/")}
        />
        <SidebarItem icon={FiFileText} label="Analysis" />

        <Box w="full">
          <Flex
            align="center"
            cursor="pointer"
            onClick={() => setDocOpen(!docOpen)}
            bg="transparent"
            p={2}
            borderRadius="md"
            justify="space-between"
            _hover={{ bg: hoverBg }}
          >
            <Flex align="center">
              <Icon as={BiStore} mr={2} color={textColor} fontSize="18px" />
              <Text color={textColor}>Loja</Text>
            </Flex>
            <Icon
              as={docOpen ? FiChevronUp : FiChevronDown}
              color={textColor}
            />
          </Flex>
          <Collapse in={docOpen} animateOpacity>
            <VStack pl={6} align="start" mt={2} spacing={2}>
              <SidebarItem
                isActive={optionIsActive("/sells")}
                onClick={() => navigate("/sells")}
                icon={MdOutlineLocalGroceryStore}
                label="Vendas"
              />
              <SidebarItem
                isActive={optionIsActive("/team")}
                onClick={() => navigate("/team")}
                icon={MdOutlineLocalGroceryStore}
                label="Equipe"
              />
              <SidebarItem
                isActive={optionIsActive("/opening-hour")}
                onClick={() => navigate("/opening-hour")}
                icon={MdOutlineLocalGroceryStore}
                label="Horário"
              />
              <SidebarItem
                isActive={optionIsActive("/about")}
                onClick={() => navigate("/about")}
                icon={MdOutlineLocalGroceryStore}
                label="Sobre a loja"
              />
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
