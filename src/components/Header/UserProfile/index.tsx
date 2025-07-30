import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Button,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";

interface UserProfileProps {
  name: string;
  avatarUrl: string;
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onLogoutClick: () => void;
}

const UserProfile = ({
  name,
  avatarUrl,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
}: UserProfileProps) => {
  const hoverBg = useColorModeValue("gray.100", "gray.600");
  const menuBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        px={3}
        py={1}
        _hover={{ bg: hoverBg }}
        _active={{ bg: hoverBg }}
        rightIcon={<ChevronDownIcon />}
        transition="background-color 0.2s"
      >
        <Flex align="center" gap={3}>
          <Avatar size="sm" name={name} src={avatarUrl} />
          <Text
            fontWeight="semibold"
            color={textColor}
            fontSize="md"
            noOfLines={1}
          >
            {name}
          </Text>
        </Flex>
      </MenuButton>

      <MenuList
        bg={menuBg}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        py={2}
      >
        <MenuItem
          icon={<Icon as={FiUser} boxSize={5} />}
          onClick={onProfileClick}
          _hover={{ bg: hoverBg }}
        >
          Perfil
        </MenuItem>

        <MenuItem
          icon={<Icon as={FiSettings} boxSize={5} />}
          onClick={onSettingsClick}
          _hover={{ bg: hoverBg }}
        >
          Configurações
        </MenuItem>

        <MenuItem
          icon={<Icon as={FiLogOut} boxSize={5} />}
          onClick={onLogoutClick}
          color="red.500"
          _hover={{ bg: useColorModeValue("red.100", "red.700") }}
        >
          Sair
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserProfile;
