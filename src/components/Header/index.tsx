import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import UserProfile from "./UserProfile";
import { useDispatch } from "react-redux";
import { setLoggout } from "@/store/features/auth/authSlice";
import { useAuth } from "@/hook/auth";
import { useNavigate } from "react-router-dom";
import OpeningHourButton from "./OpeningHourButton";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, company } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  if (!user || !company) return null;

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="4"
      bg={bgColor}
      position="sticky"
      top="0"
      zIndex="10"
      borderBottom="1px solid"
      borderColor={borderColor}
    >
      <Text fontSize="lg" fontWeight="bold">
        {company.name}
      </Text>

      <Flex flexDirection="row" gap={4} whiteSpace="nowrap" overflow="hidden">
        <Flex align="center" gap={4}>
          <OpeningHourButton />
          <IconButton
            aria-label="Alternar tema"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            size="md"
          />
        </Flex>

        <UserProfile
          name={user.name}
          avatarUrl={user.imageUrl || ""}
          onProfileClick={() => navigate("/profile")}
          onSettingsClick={() => {}}
          onLogoutClick={() => {
            localStorage.removeItem("token");
            dispatch(setLoggout());
          }}
        />
      </Flex>
    </Flex>
  );
};

export default Header;
