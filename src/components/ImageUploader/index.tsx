import { Box, Avatar, Input, Stack, FormLabel } from "@chakra-ui/react";
import { useState, type ChangeEvent } from "react";

export default function ImageUploader({
  previewUrl,
  onChange,
}: {
  previewUrl?: string;
  onChange?: (file: File) => void;
}) {
  const [preview, setPreview] = useState<string | null>(previewUrl ?? null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange?.(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      p={4}
      borderRadius="md"
      maxW="320px"
      mx="auto"
      display="flex"
      justifyContent="center"
    >
      <Stack spacing={4} align="center">
        <Avatar size="2xl" src={preview ?? undefined} />
        <FormLabel
          htmlFor="file-input"
          cursor="pointer"
          color="primary.500"
          _hover={{ textDecoration: "underline" }}
        >
          {previewUrl ? "Alterar imagem" : "Carregar imagem"}
        </FormLabel>
        <Input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          display="none"
        />
      </Stack>
    </Box>
  );
}
