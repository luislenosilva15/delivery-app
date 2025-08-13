/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Badge,
  Tooltip,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Breadcrumb from "@/components/Breadcrumb";

import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  fetchGroupsRequest,
  fetchProductsRequest,
  setCreateNewGroupRequest,
  setCreateNewProductRequest,
  setDeleteGroupRequest,
  setToggleDisableGroupRequest,
} from "@/store/features/menu/menuSlice";
import { useMenu } from "@/hook/menu";
import NewProductModal from "@/components/Modals/Product/Create";
import type { FormData } from "@/components/Modals/Product/Create/types";
import type { FormData as GroupFormData } from "@/components/Modals/Group/Create/types";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import type { TGroup } from "@/store/features/menu/types/models";
import NewGroupModal from "@/components/Modals/Group/Create";

export default function MenuPage() {
  const dispatch = useDispatch();

  const {
    isOpen: isOpenProductModal,
    onClose: onCloseProductModal,
    onOpen: onOpenProductModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteGroupModal,
    onClose: onCloseDeleteGroupModal,
    onOpen: onOpenDeleteGroupModal,
  } = useDisclosure();

  const {
    isOpen: isOpenGroupModal,
    onClose: onCloseGroupModal,
    onOpen: onOpenGroupModal,
  } = useDisclosure();

  const { groups, products, loading, loadingProducts } = useMenu();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [currentGroup, setCurrentGroup] = useState<TGroup | null>(null);

  const tabBorderColor = useColorModeValue("gray.200", "gray.700");
  const itemBgColor = useColorModeValue("white", "gray.700");
  const itemBorderColor = useColorModeValue("gray.200", "gray.600");
  const itemImageBgColor = useColorModeValue("gray.100", "gray.600");
  const itemDescriptionColor = useColorModeValue("gray.500", "gray.400");

  const onDragEndItems = (result, groupId) => {
    const { source, destination } = result;
    if (!destination) return;

    const groupIndex = groups.findIndex((g) => g.id === groupId);
    const items = Array.from(groups[groupIndex].items);

    const [moved] = items.splice(source.index, 1);
    items.splice(destination.index, 0, moved);

    const updatedGroups = [...groups];
    updatedGroups[groupIndex].items = items;
    // setGroups(updatedGroups);
  };

  const breadcrumbLinks = [
    { label: "Home", href: "/" },
    { label: "Cardápio", isCurrent: true },
  ];

  useEffect(() => {
    dispatch(fetchGroupsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (groups?.length) {
      dispatch(fetchProductsRequest({ groupId: groups[activeTabIndex]?.id }));
    }
  }, [activeTabIndex, dispatch, groups?.map((g) => g.id).join(",")]);

  if (!groups?.length && loading) {
    return (
      <Center minHeight="300px">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="primary.500" />
      </Center>
    );
  }

  const handleCreateNewProduct = (product: FormData): void => {
    dispatch(
      setCreateNewProductRequest({
        product,
        menuGroupId: groups[activeTabIndex].id,
      })
    );
  };

  const handleDisableGroup = (groupId: number, disabled: boolean) => {
    dispatch(setToggleDisableGroupRequest({ disabled, groupId }));
  };

  const handleDeleteGroup = () => {
    if (!currentGroup) return;
    onCloseDeleteGroupModal();
    setCurrentGroup(null);
    dispatch(setDeleteGroupRequest({ groupId: currentGroup.id }));
  };

  const handleCreateNewGroup = (group: GroupFormData): void => {
    dispatch(
      setCreateNewGroupRequest({
        group,
      })
    );
    onCloseGroupModal();
  };

  if (!groups?.length && !loading) {
    return (
      <Center
        minHeight="300px"
        flexDirection="column"
        color="gray.500"
        px={6}
        textAlign="center"
      >
        <Box fontSize="6xl" mb={4} opacity={0.3} userSelect="none">
          📭
        </Box>
        <Text fontSize="xl" fontWeight="semibold" mb={2}>
          Nenhum grupo encontrado
        </Text>
        <Text maxW="md" mb={4}>
          Parece que ainda não há grupos cadastrados. Clique em "Novo Grupo"
          para começar a criar seu cardápio.
        </Text>
        <Button
          colorScheme="primary"
          leftIcon={<AddIcon />}
          onClick={onOpenGroupModal}
        >
          Novo Grupo
        </Button>
      </Center>
    );
  }

  return (
    <>
      <Box mx="auto" p={6}>
        <Breadcrumb links={breadcrumbLinks} />
        <Stack spacing={4}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"space-between"}
          >
            <Heading size="md">Cardápio</Heading>
            <Box display="flex" gap={2} alignItems={"center"}>
              <Button
                colorScheme="primary"
                leftIcon={<AddIcon />}
                onClick={onOpenGroupModal}
              >
                Novo Grupo
              </Button>

              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Opções"
                  icon={<BsThreeDotsVertical />}
                  variant="ghost"
                  size="lg"
                />
                <MenuList>
                  <MenuItem>Ordenar grupos</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Box>

          <Box mt={2}>
            <Tabs
              variant="enclosed"
              index={activeTabIndex}
              onChange={(index) => setActiveTabIndex(index)}
            >
              <Flex
                borderBottom="2px solid"
                borderColor={tabBorderColor}
                mb="-2px"
                flexWrap="nowrap"
                overflowX="auto"
              >
                {groups?.map((group, index) => (
                  <Box
                    key={group.id}
                    role="tab"
                    position="relative"
                    paddingX={4}
                    paddingY={2}
                    marginRight={1}
                    fontWeight="semibold"
                    cursor="pointer"
                    userSelect="none"
                    onClick={() => setActiveTabIndex(index)}
                    backgroundColor={
                      activeTabIndex === index ? "primary.500" : "transparent"
                    }
                    borderTopRadius="md"
                    _hover={{
                      bg: "primary.400",
                    }}
                    transition={"background-color 0.3s"}
                    whiteSpace="nowrap"
                  >
                    {group.name}
                    {group.disabled && (
                      <Box
                        as="span"
                        ml={2}
                        boxSize={2}
                        bg="red.500"
                        borderRadius="full"
                        display="inline-block"
                        verticalAlign="middle"
                        title="Grupo desabilitado"
                      />
                    )}
                  </Box>
                ))}
              </Flex>

              <TabPanels>
                {groups?.map((group) => {
                  const isEmptyProducts =
                    !loadingProducts && products?.length === 0;

                  return (
                    <TabPanel key={group.id}>
                      <Flex justify="space-between" align="center" mb={4}>
                        <Heading
                          size="md"
                          display="flex"
                          alignItems="center"
                          gap={2}
                        >
                          {group.name}
                          {group.disabled && (
                            <Tooltip
                              label="Este grupo está desabilitado e não será exibido na tela de cardápio."
                              placement="top"
                              openDelay={300}
                            >
                              <Badge
                                colorScheme="red"
                                fontSize="0.6em"
                                padding={2}
                                borderRadius={6}
                                cursor="help"
                              >
                                Desabilitado
                              </Badge>
                            </Tooltip>
                          )}
                        </Heading>

                        <Box display="flex" flexDirection="row" gap={2}>
                          <Button
                            size="sm"
                            leftIcon={<AddIcon />}
                            colorScheme="primary"
                            onClick={onOpenProductModal}
                          >
                            Novo Produto
                          </Button>

                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Opções"
                              icon={<BsThreeDotsVertical />}
                              variant="ghost"
                              size="sm"
                            />
                            <MenuList>
                              <MenuItem>Editar</MenuItem>
                              <MenuItem
                                onClick={() => {
                                  setCurrentGroup(group);
                                  onOpenDeleteGroupModal();
                                }}
                              >
                                Excluir
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleDisableGroup(group.id, group.disabled);
                                }}
                              >
                                {!group.disabled ? "Desabilitar" : "Habilitar"}
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Box>
                      </Flex>

                      {/* DragDropContext só para itens */}
                      <DragDropContext
                        onDragEnd={(result) => onDragEndItems(result, group.id)}
                      >
                        <Droppable
                          droppableId={group.id.toString()}
                          direction="vertical"
                          type="item"
                        >
                          {(provided) => (
                            <Stack
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              spacing={3}
                              minHeight="150px" // altura mínima para centralizar spinner e empty
                              justifyContent={
                                loadingProducts || isEmptyProducts
                                  ? "center"
                                  : undefined
                              }
                              alignItems={
                                loadingProducts || isEmptyProducts
                                  ? "center"
                                  : undefined
                              }
                            >
                              {loadingProducts && (
                                <Center w="100%">
                                  <Spinner
                                    size="lg"
                                    thickness="4px"
                                    speed="0.65s"
                                    color="primary.500"
                                  />
                                </Center>
                              )}

                              {!loadingProducts && isEmptyProducts && (
                                <Center
                                  flexDirection="column"
                                  color="gray.500"
                                  px={6}
                                  textAlign="center"
                                  w="100%"
                                  userSelect="none"
                                >
                                  <Box fontSize="6xl" mb={4} opacity={0.3}>
                                    🛒
                                  </Box>
                                  <Text
                                    fontSize="lg"
                                    fontWeight="semibold"
                                    mb={2}
                                  >
                                    Nenhum produto encontrado
                                  </Text>
                                  <Text maxW="md" mb={4}>
                                    Este grupo ainda não possui produtos
                                    cadastrados.
                                  </Text>
                                </Center>
                              )}

                              {!loadingProducts &&
                                !isEmptyProducts &&
                                products?.map((item, index) => (
                                  <Draggable
                                    draggableId={item.id.toString()}
                                    index={index}
                                    key={item.id}
                                  >
                                    {(provided) => (
                                      <Flex
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        p={3}
                                        borderWidth="1px"
                                        borderRadius="md"
                                        align="center"
                                        justify="space-between"
                                        _hover={{ cursor: "grab" }}
                                        bg={itemBgColor}
                                        borderColor={itemBorderColor}
                                      >
                                        <HStack>
                                          <Image
                                            boxSize="50px"
                                            borderRadius="md"
                                            bg={itemImageBgColor}
                                            alt={item.name}
                                            src={item?.image}
                                          />
                                          <Box>
                                            <Text fontWeight="bold">
                                              {item.name}
                                            </Text>
                                            <Text
                                              fontSize="sm"
                                              color={itemDescriptionColor}
                                            >
                                              {item.description}
                                            </Text>
                                            <Badge colorScheme="green">
                                              R$ {item.price}
                                            </Badge>
                                          </Box>
                                        </HStack>
                                        <HStack marginRight={4}>
                                          <Menu>
                                            <MenuButton
                                              as={IconButton}
                                              aria-label="Mais opções"
                                              icon={
                                                <Text fontSize="xl">⋮</Text>
                                              }
                                              size="sm"
                                              variant="ghost"
                                            />
                                            <MenuList>
                                              <MenuItem onClick={() => {}}>
                                                Desabilitar
                                              </MenuItem>
                                              <MenuItem onClick={() => {}}>
                                                Editar
                                              </MenuItem>
                                              <MenuItem onClick={() => {}}>
                                                Excluir
                                              </MenuItem>
                                            </MenuList>
                                          </Menu>
                                        </HStack>
                                      </Flex>
                                    )}
                                  </Draggable>
                                ))}
                              {provided.placeholder}
                            </Stack>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </Box>
        </Stack>
      </Box>

      <NewProductModal
        isOpen={isOpenProductModal}
        onClose={onCloseProductModal}
        onSubmit={handleCreateNewProduct}
      />
      <ConfirmModal
        isOpen={isOpenDeleteGroupModal}
        onClose={onCloseDeleteGroupModal}
        onSave={handleDeleteGroup}
        title="Excluir Grupo"
        description="Tem certeza que deseja excluir este grupo? Todos os produtos associados a ele também serão excluídos."
      />

      <NewGroupModal
        isOpen={isOpenGroupModal}
        onClose={onCloseGroupModal}
        onSubmit={handleCreateNewGroup}
      />
    </>
  );
}
