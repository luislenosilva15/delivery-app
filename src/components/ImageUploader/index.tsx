import {
  Box,
  Avatar,
  Input,
  Stack,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useRef, useState, type ChangeEvent } from "react";
import { FiUpload, FiTrash2 } from "react-icons/fi";

export default function ImageUploader({
  previewUrl,
  onChange,
}: {
  previewUrl?: string;
  onChange?: (file: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(previewUrl ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleRemoveImage = () => {
    setPreview(null);
    onChange?.(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
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
        <HStack spacing={3}>
          <Button
            onClick={triggerFileInput}
            leftIcon={<Icon as={FiUpload} />}
            colorScheme="blue"
            variant="solid"
            size="sm"
          >
            {preview ? "Alterar" : "Adicionar"}
          </Button>
          {preview && (
            <Button
              onClick={handleRemoveImage}
              leftIcon={<Icon as={FiTrash2} />}
              colorScheme="red"
              variant="outline"
              size="sm"
            >
              Remover
            </Button>
          )}
        </HStack>
        <Input
          ref={inputRef}
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
