import { useEffect, useState, useRef } from "react";
import {
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Button,
} from "@chakra-ui/react";

const { addStore } = require("../features/store/storeServices");
const { getPlatform } = require("../features/platform/platformServices");

export default function AddStoreForm({ business_id }) {
  const [platforms, setPlatforms] = useState([]);
  const [platform_id, setPlatformId] = useState("");

  useEffect(() => {
    const fetchPlatforms = async () => {
      const platforms = await getPlatform();
      setPlatforms(platforms);
    };

    fetchPlatforms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const store = await addStore({ business_id, platform_id });
    console.log(store);
  };

  return (
    <Popover placement="bottom" closeOnBlur={false}>
      <PopoverTrigger>
        <Button>Add New Store</Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Add a New Store
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <div>
            <label>Platform</label>
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
        </PopoverBody>
        <PopoverFooter
          border="0"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <ButtonGroup onClick={handleSubmit} size="sm">
            <Button colorScheme="green">Add</Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
