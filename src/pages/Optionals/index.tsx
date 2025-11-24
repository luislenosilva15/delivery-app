import { Box, Heading, Stack } from "@chakra-ui/react";
import Breadcrumb from "@/components/Breadcrumb";
import OptionalsContent from "@/components/OptionalsContent";

export default function OptionalsPage() {
  const breadcrumbLinks = [
    { label: "Home", href: "/" },
    { label: "Opcionais", isCurrent: true },
  ];

  return (
    <Box w="100%" p={6}>
      <Breadcrumb links={breadcrumbLinks} />
      <Stack spacing={4} w="100%">
        <Heading mt={2} size="md">
          Opcionais
        </Heading>
        <OptionalsContent />
      </Stack>
    </Box>
  );
}
