import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  onSave: () => void;
  onCancel?: () => void;
  saveText?: string;
  cancelText?: string;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  title,
  description,
  onSave,
  onCancel,
  saveText = "Salvar",
  cancelText = "Cancelar",
}: ConfirmModalProps) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{description && <Text>{description}</Text>}</ModalBody>

        <ModalFooter>
          <Button mr={3} variant="outline" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button colorScheme="primary" onClick={onSave}>
            {saveText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
