/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
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
import Breadcrumb from "@/components/Breadcrumb";

import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  fetchGroupsRequest,
  fetchProductsRequest,
  setCreateNewGroupRequest,
  setCreateNewProductRequest,
  setDeleteGroupRequest,
  setDeleteProductRequest,
  setEditGroupRequest,
  setEditProductRequest,
  setToggleDisableGroupRequest,
  setToggleDisableProductRequest,
} from "@/store/features/menu/menuSlice";
import { useMenu } from "@/hook/menu";
import NewProductModal from "@/components/Modals/Product/Create";
import type { FormData } from "@/components/Modals/Product/Create/types";
import type { FormData as GroupFormData } from "@/components/Modals/Group/Create/types";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import type { TGroup } from "@/store/features/menu/types/models";
import NewGroupModal from "@/components/Modals/Group/Create";
import ProductCard from "@/components/Card/Product";
import { GroupEmptyState } from "./emptyState";
import { ProductModalDetails } from "@/components/Modals/Product/Details";
import { GroupModalDetails } from "@/components/Modals/Group/Details";

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

  const {
    isOpen: isOpenDeleteProductModal,
    onClose: onCloseDeleteProductModal,
    onOpen: onOpenDeleteProductModal,
  } = useDisclosure();

  const {
    isOpen: isOpenProductDetailsModal,
    onClose: onCloseProductDetailsModal,
    onOpen: onOpenProductDetailsModal,
  } = useDisclosure();

  const {
    isOpen: isOpenGroupDetailsModal,
    onClose: onCloseGroupDetailsModal,
    onOpen: onOpenGroupDetailsModal,
  } = useDisclosure();

  const { groups, products, loading, loadingProducts, currentMenu } = useMenu();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [currentGroup, setCurrentGroup] = useState<TGroup | null>(null);
  const [currentProductId, setCurrentProductId] = useState<number | null>(null);
  const tabBorderColor = useColorModeValue("gray.200", "gray.700");

  const breadcrumbLinks = [
    { label: "Home", href: "/" },
    { label: "Cardápio", isCurrent: true },
  ];

  useEffect(() => {
    dispatch(fetchGroupsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (groups?.length && groups[activeTabIndex]?.id) {
      dispatch(fetchProductsRequest({ groupId: groups[activeTabIndex].id }));
    }
  }, [activeTabIndex, dispatch, groups?.map((g) => g.id).join(",")]);

  useEffect(() => {
    if (groups?.length && activeTabIndex >= groups.length) {
      setActiveTabIndex(0);
    }
  }, [groups?.length, activeTabIndex]);

  if (!groups?.length && loading) {
    return (
      <Center minHeight="300px">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="primary.500" />
      </Center>
    );
  }

  const handleSubmitProductModal = (product: FormData): void => {
    if (currentProductId) {
      dispatch(
        setEditProductRequest({
          product,
          productId: currentProductId,
        })
      );
    } else {
      dispatch(
        setCreateNewProductRequest({
          product,
          menuGroupId: groups[activeTabIndex].id,
        })
      );
    }
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
    if (!currentMenu || !group) return;

    if (currentGroup) {
      dispatch(
        setEditGroupRequest({
          group,
          groupId: currentGroup.id,
        })
      );
    } else {
      dispatch(
        setCreateNewGroupRequest({
          group,
          menuId: currentMenu.id,
        })
      );
    }

    onCloseGroupModal();
  };

  const handleDeleteProduct = () => {
    if (!currentProductId) return;
    dispatch(setDeleteProductRequest({ productId: currentProductId }));
    setCurrentProductId(null);
    onCloseDeleteProductModal();
  };

  const handleToggleDisableProduct = (productId: number, disabled: boolean) => {
    dispatch(setToggleDisableProductRequest({ productId, disabled }));
  };

  if (!groups?.length && !loading)
    <GroupEmptyState onOpenGroupModal={onOpenGroupModal} />;

  return (
    <>
      <Box mx="auto" p={6}>
        <Breadcrumb links={breadcrumbLinks} />
        <Stack spacing={4}>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="row"
          >
            <Heading size="md" mt={2}>
              Cardápio
            </Heading>
            <Box display="flex" gap={2} alignItems="center">
              <Button
                colorScheme="primary"
                leftIcon={<AddIcon />}
                onClick={() => {
                  setCurrentGroup(null);
                  onOpenGroupModal();
                }}
              >
                Novo Grupo
              </Button>
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
                    px={4}
                    py={2}
                    mr={1}
                    fontWeight="semibold"
                    cursor="pointer"
                    userSelect="none"
                    onClick={() => setActiveTabIndex(index)}
                    backgroundColor={
                      activeTabIndex === index ? "primary.500" : "transparent"
                    }
                    borderTopRadius="md"
                    _hover={{ bg: "primary.400" }}
                    transition="background-color 0.3s"
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
                                p={2}
                                borderRadius={6}
                                cursor="help"
                              >
                                Desabilitado
                              </Badge>
                            </Tooltip>
                          )}
                        </Heading>

                        <Box display="flex" gap={2}>
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
                              <MenuItem
                                onClick={() => {
                                  setCurrentGroup(group);
                                  onOpenGroupDetailsModal();
                                }}
                              >
                                Visualizar grupo
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  setCurrentGroup(group);
                                  onOpenGroupModal();
                                }}
                              >
                                Editar grupo
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  setCurrentGroup(group);
                                  onOpenDeleteGroupModal();
                                }}
                              >
                                Excluir grupo
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  handleDisableGroup(group.id, group.disabled)
                                }
                              >
                                {!group.disabled
                                  ? "Desabilitar grupo"
                                  : "Habilitar grupo"}
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Box>
                      </Flex>

                      <Stack
                        spacing={3}
                        minHeight="150px"
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
                            <Text fontSize="lg" fontWeight="semibold" mb={2}>
                              Nenhum produto encontrado
                            </Text>
                            <Text maxW="md" mb={4}>
                              Este grupo ainda não possui produtos cadastrados.
                            </Text>
                          </Center>
                        )}

                        {!loadingProducts &&
                          !isEmptyProducts &&
                          products?.map((item) => (
                            <ProductCard
                              key={item.id}
                              item={item}
                              onEdit={(id) => {
                                setCurrentProductId(id);
                                onOpenProductModal();
                              }}
                              onDisable={(id) =>
                                handleToggleDisableProduct(id, item.disabled)
                              }
                              onDelete={(id) => {
                                setCurrentProductId(id);
                                onOpenDeleteProductModal();
                              }}
                              onClickCard={(id) => {
                                setCurrentProductId(id);
                                onOpenProductDetailsModal();
                              }}
                            />
                          ))}
                      </Stack>
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </Box>
        </Stack>
      </Box>

      {/* Modais */}
      <NewProductModal
        isOpen={isOpenProductModal}
        onClose={() => {
          setCurrentProductId(null);
          onCloseProductModal();
        }}
        onSubmit={handleSubmitProductModal}
        productId={currentProductId}
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
        onClose={() => {
          setCurrentGroup(null);
          onCloseGroupModal();
        }}
        onSubmit={handleCreateNewGroup}
        groupId={currentGroup?.id}
      />

      <ConfirmModal
        isOpen={isOpenDeleteProductModal}
        onClose={onCloseDeleteProductModal}
        onSave={handleDeleteProduct}
        title="Excluir Produto"
        description="Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita."
      />

      <ProductModalDetails
        isOpen={isOpenProductDetailsModal}
        onClose={() => {
          setCurrentProductId(null);
          onCloseProductDetailsModal();
        }}
        productId={currentProductId}
      />

      <GroupModalDetails
        isOpen={isOpenGroupDetailsModal}
        onClose={onCloseGroupDetailsModal}
        groupId={currentGroup?.id as number}
      />
    </>
  );
}
