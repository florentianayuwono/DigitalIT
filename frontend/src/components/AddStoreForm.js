import { useEffect, useState, useRef } from "react";
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
import { useNavigate } from "react-router-dom";

const { addStore } = require("../features/store/storeServices");
const { getPlatform } = require("../features/platform/platformServices");

export default function AddStoreForm({ business_id, refresh }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const execute = () => {
    handleSubmit();
    refresh((prev) => !prev);
    onClose();
    navigate("");
  };
  const [platforms, setPlatforms] = useState([]);
  const [platform_id, setPlatformId] = useState("");

  useEffect(() => {
    const fetchPlatforms = async () => {
      const platforms = await getPlatform();
      setPlatforms(platforms);
    };

    fetchPlatforms();
  }, []);

  const handleSubmit = async () => {
    const store = await addStore({ business_id, platform_id });
  };

  return (
    <div className="row d-flex justify-content-center align-content-center">
      <button className="btn btn-primary btn-lg" onClick={onOpen}>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Add a new store
              </AlertDialogHeader>

              <AlertDialogBody>
                <div>
                  <label className="me-2">Platform</label>
                  <select
                    value={platform_id}
                    onChange={(e) => setPlatformId(e.target.value)}
                  >
                    <option value="">Select a platform</option>
                    {platforms.map((platform) => {
                      return (
                        <option
                          key={platform.platform_id}
                          value={platform.platform_id}
                        >
                          {platform.platform_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="purple" onClick={execute} ml={3}>
                  Add Store
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        Add new store
      </button>
    </div>
  );
}
