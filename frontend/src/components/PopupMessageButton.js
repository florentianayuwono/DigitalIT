import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

/**
 * 
 * @param {Object} props - The prop of the component
 * @param {function} props.action - The function to call when the popup is closed
 * @param {string} props.message - The message to display in the popup
 * @param {string} props.title - The title of the popup
 * @param {string} props.executeTitle - The title of the button to execute the action
 * @param {string} props.colorScheme - The color scheme of the popup
 * @returns {JSX.Element} - The popup with button component
 */
export default function PopupMessageButton({
  action,
  message,
  title,
  executeTitle,
  colorScheme,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const execute = (e) => {
    action(e);
    onClose(e);
  }

  return (
    <>
      <Button colorScheme={colorScheme || "red"} onClick={onOpen}>
        {title}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              {message}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme={colorScheme || "red"} onClick={execute} ml={3}>
                {executeTitle}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
