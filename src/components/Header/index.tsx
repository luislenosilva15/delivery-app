import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text, useColorMode } from "@chakra-ui/react";
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

  if (!user || !company) return null;

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="4"
      bg="bg.surface"
      position="sticky"
      top="0"
      zIndex="10"
      borderBottom="1px solid"
      borderColor="border.subtle"
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
