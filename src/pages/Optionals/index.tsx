import { Box, Heading, Flex } from "@chakra-ui/react";
import Breadcrumb from "@/components/Breadcrumb";
import OptionalsContent from "@/components/OptionalsContent";

export default function OptionalsPage() {
  const breadcrumbLinks = [
    { label: "Cardápio", href: "/menu" },
    { label: "Opcionais", href: "/opcionais" },
  ];

  return (
    <Box p={6}>
      <Breadcrumb links={breadcrumbLinks} />
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md">Opcionais</Heading>
      </Flex>
      <OptionalsContent />
    </Box>
  );
}
