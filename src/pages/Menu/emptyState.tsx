import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Text } from "@chakra-ui/react";

const GroupEmptyState = ({
  onOpenGroupModal,
}: {
  onOpenGroupModal: () => void;
}) => {
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
        Parece que ainda não há grupos cadastrados. Clique em "Novo Grupo" para
        começar a criar seu cardápio.
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
};

export { GroupEmptyState };
