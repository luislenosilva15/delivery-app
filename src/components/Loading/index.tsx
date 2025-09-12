import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex justify="center" align="start" mt={20}>
      <Spinner size="xl" />
    </Flex>
  );
}
