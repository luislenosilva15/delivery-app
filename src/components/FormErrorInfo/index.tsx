import { Box } from "@chakra-ui/react";

const FormErrorInfo = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box hidden={!children} color="red.500" fontSize="sm" mt={1}>
      {children}
    </Box>
  );
};

export default FormErrorInfo;
