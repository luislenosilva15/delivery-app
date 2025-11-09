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
  FiHelpCircle,
  FiHome,
  FiSettings,
} from "react-icons/fi";

import { HiUsers } from "react-icons/hi2";

import { BsClipboardData } from "react-icons/bs";

import { BiStore } from "react-icons/bi";
import {
  MdOutlineLocalGroceryStore,
  MdOutlineRestaurant,
  MdDeliveryDining,
  MdKitchen,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hook/auth";
import { SettingsIcon } from "@chakra-ui/icons";

function SidebarContent() {
  const [storeOpen, setStoreOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [statisticsOpen, setStatisticsOpen] = useState(false);

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
        <SidebarItem
          icon={MdOutlineRestaurant}
          label="Cardápio"
          isActive={optionIsActive("/menu")}
          onClick={() => navigate("/menu")}
        />

        <SidebarItem
          icon={MdKitchen}
          label="Pedidos"
          isActive={optionIsActive("/order-manager")}
          onClick={() => navigate("/order-manager")}
        />

        {/* LOJA */}
        <Box w="full">
          <Flex
            align="center"
            cursor="pointer"
            onClick={() => setStoreOpen(!storeOpen)}
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
              as={storeOpen ? FiChevronUp : FiChevronDown}
              color={textColor}
            />
          </Flex>
          <Collapse in={storeOpen} animateOpacity>
            <VStack pl={6} align="start" mt={2} spacing={2}>
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

        {/* DELIVERY */}
        <Box w="full">
          <Flex
            align="center"
            cursor="pointer"
            onClick={() => setDeliveryOpen(!deliveryOpen)}
            bg="transparent"
            p={2}
            borderRadius="md"
            justify="space-between"
            _hover={{ bg: hoverBg }}
          >
            <Flex align="center">
              <Icon
                as={MdDeliveryDining}
                mr={2}
                color={textColor}
                fontSize="18px"
              />
              <Text color={textColor}>Delivery</Text>
            </Flex>
            <Icon
              as={deliveryOpen ? FiChevronUp : FiChevronDown}
              color={textColor}
            />
          </Flex>
          <Collapse in={deliveryOpen} animateOpacity>
            <VStack pl={6} align="start" mt={2} spacing={2}>
              <SidebarItem
                isActive={optionIsActive("/delivery/settings")}
                onClick={() => navigate("/delivery/settings")}
                icon={SettingsIcon}
                label="Configurações"
              />
            </VStack>
          </Collapse>
        </Box>
      </VStack>

      {/* Estatisticas */}
      <Box w="full" mt={2}>
        <Flex
          align="center"
          cursor="pointer"
          onClick={() => setStatisticsOpen(!statisticsOpen)}
          bg="transparent"
          p={2}
          borderRadius="md"
          justify="space-between"
          _hover={{ bg: hoverBg }}
        >
          <Flex align="center">
            <Icon
              as={BsClipboardData}
              mr={2}
              color={textColor}
              fontSize="18px"
            />
            <Text color={textColor}>Estatísticas</Text>
          </Flex>
          <Icon
            as={statisticsOpen ? FiChevronUp : FiChevronDown}
            color={textColor}
          />
        </Flex>
        <Collapse in={statisticsOpen} animateOpacity>
          <VStack pl={6} align="start" mt={2} spacing={2}>
            <SidebarItem
              isActive={optionIsActive("/statistics/clients")}
              onClick={() => navigate("/statistics/clients")}
              icon={HiUsers}
              label="Clientes"
            />
          </VStack>
        </Collapse>
      </Box>

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
