import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Tag,
  Avatar,
  useColorModeValue,
  Stack,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState, useCallback } from "react";
import { useTeam } from "@/hook/team";
import { useDispatch } from "react-redux";
import {
  fetchTeamRequest,
  resetTeam,
  setChangeTeamPermissionRequest,
  setCreateNewTeamRequest,
  setDeleteTeamRequest,
  setToggleActiveTeamRequest,
} from "@/store/features/team/teamSlice";
import { normalizeTeamRole } from "@/helpers/normalizeTeamRole";
import Breadcrumb from "@/components/Breadcrumb";
import CreateTeamModal from "@/components/Modals/Team/Create";
import type { SetCreateNewTeamRequest } from "@/store/features/team/types/request";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import type { TUser } from "@/store/features/team/types/models";

export default function TeamPage() {
  const dispatch = useDispatch();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenActive,
    onClose: onCloseActive,
    onOpen: onOpenActive,
  } = useDisclosure();

  const { users, loading, loadingMore, page, hasMore, total } = useTeam();

  const [searchText, setSearchText] = useState("");
  const [currentTeam, setCurrentTeam] = useState<TUser | null>(null);
  const [editPermission, setEditPermission] = useState(false);

  const textTotal = useColorModeValue("gray.600", "gray.200");

  const fetchTeams = useCallback(
    (pageNum: number, query: string) => {
      dispatch(fetchTeamRequest({ page: pageNum, search: query }));
    },
    [dispatch]
  );

  useEffect(() => {
    return () => {
      dispatch(resetTeam());
    };
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchTeams(1, searchText);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchText, fetchTeams]);

  const handleCreateNewTeam = (
    teamData: SetCreateNewTeamRequest["teamData"]
  ) => {
    onClose();

    if (editPermission) {
      return dispatch(
        setChangeTeamPermissionRequest({
          teamId: Number(currentTeam?.id),
          permission: teamData.role,
        })
      );
    }

    dispatch(
      setCreateNewTeamRequest({
        teamData,
      })
    );
  };

  const handleDeleteTeam = () => {
    dispatch(
      setDeleteTeamRequest({
        teamId: Number(currentTeam?.id),
      })
    );
    onCloseDelete();
  };

  const handleToggleActiveTeam = () => {
    dispatch(
      setToggleActiveTeamRequest({
        teamId: Number(currentTeam?.id),
        isActive: currentTeam?.isActive as boolean,
      })
    );
    onCloseActive();
  };

  const breadcrumbLinks = [
    { label: "Home", href: "/" },
    { label: "Equipe", isCurrent: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading &&
        !loadingMore &&
        hasMore
      ) {
        fetchTeams(page + 1, searchText);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, loadingMore, hasMore, page, searchText, fetchTeams]);

  useEffect(() => {
    if (!isOpen) setEditPermission(false);
  }, [isOpen]);

  return (
    <>
      <Box mx="auto" p={6}>
        <Breadcrumb links={breadcrumbLinks} />
        <Stack>
          <Flex justify="space-between" align="center">
            <Heading size="md">Equipe</Heading>
            <Button onClick={onOpen} colorScheme="primary">
              Adicionar Usuário
            </Button>
          </Flex>

          <Flex justify="space-between" align="center" mb={4}>
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Buscar"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </InputGroup>
            <Text fontSize="sm" color={textTotal}>
              Total: {total} usuários
            </Text>
          </Flex>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Perfil</Th>
                <Th>Status</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.map((u) => (
                <Tr key={u.id}>
                  <Td>
                    <HStack spacing={3}>
                      <Avatar name={u.name} size="sm" />
                      <Box>
                        <Text fontWeight="medium">{u.name}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {u.email}
                        </Text>
                      </Box>
                    </HStack>
                  </Td>
                  <Td>{normalizeTeamRole(u.role)}</Td>
                  <Td>
                    <Tag colorScheme={u.isActive ? "green" : "red"} size="sm">
                      {u.isActive ? "Ativo" : "Inativo"}
                    </Tag>
                  </Td>
                  <Td textAlign="right" px={2}>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Mais opções"
                        icon={<Text fontSize="xl">⋮</Text>}
                        size="sm"
                        variant="ghost"
                      />
                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            setCurrentTeam(u);
                            setEditPermission(true);
                            onOpen();
                          }}
                        >
                          Editar permissões
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setCurrentTeam(u);
                            onOpenActive();
                          }}
                        >
                          {u.isActive ? "Desativar" : "Ativar"}
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setCurrentTeam(u);
                            onOpenDelete();
                          }}
                        >
                          Excluir
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {(loading || loadingMore) && (
            <Flex justify="center" mt={4}>
              <Spinner color="primary.500" />
            </Flex>
          )}
        </Stack>
      </Box>

      <CreateTeamModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleCreateNewTeam}
        mode={editPermission ? "edit" : "create"}
      />

      <ConfirmModal
        title="Excluir Usuário"
        description="Tem certeza que deseja excluir esse usuário?"
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        onSave={handleDeleteTeam}
        saveText="Excluir"
      />

      <ConfirmModal
        title={currentTeam?.isActive ? "Desativar Usuário" : "Ativar Usuário"}
        description={
          currentTeam?.isActive
            ? "Tem certeza que deseja desativar esse usuário?"
            : "Tem certeza que deseja ativar esse usuário?"
        }
        isOpen={isOpenActive}
        onClose={onCloseActive}
        onSave={handleToggleActiveTeam}
        saveText={currentTeam?.isActive ? "Desativar" : "Ativar"}
      />
    </>
  );
}
