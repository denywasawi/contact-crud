import { ContactType } from "@/types";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ContactType;
  onAction: (data?: ContactType) => void;
}
export default function ModalDelete(props: Readonly<Props>) {
  const { isOpen, onClose, data, onAction } = props;

  const onDelete = () => {
    onAction(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="dark text-foreground bg-background">
      <ModalContent>
        <ModalHeader>Delete</ModalHeader>
        <ModalBody>
          {`Do you want to delete "${data?.firstName} ${data?.lastName}"`}
        </ModalBody>
        <ModalFooter>
          <Button color="warning" variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button color="danger" onClick={onDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
