import { FaAddressCard } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useBusinessContext } from "../features/business/businessContext";
import { addBusiness } from "../features/business/businessServices";
import { useNavigate } from "react-router-dom";
import { getPlatform } from "../features/platform/platformServices";
import { addStore } from "../features/store/storeServices";

import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";

const listOfCategories = [
  { category: "Food and Groceries" },
  { category: "Fashion and Clothings" },
  { category: "Electronics" },
  { category: "Health and Beauty" },
  { category: "Home and Garden" },
  { category: "Automotive" },
  { category: "Travel and Leisure" },
  { category: "Pet Supplies" },
  { category: "Sports and Outdoors" },
  { category: "Toys and Games" },
  { category: "Baby and Children" },
  { category: "Art and Collectibles" },
];

export default function InputBusinessParticular() {
  const [formData, setFormData] = useState({
    businessName: "",
    business_category: "",
    hasDigitalized: "",
    selectedPlatforms: [],
  });
  const { businesses, dispatch } = useBusinessContext();
  const [categories, setCategories] = useState(listOfCategories);
  const [newBusiness, setNewBusiness] = useState();
  const [platforms, setPlatforms] = useState([]);
  const toast = useToast();
  const nav = useNavigate();
  console.log(formData);

  // Message to be shown (if there's error or something)
  const [status, setStatus] = useState("");
  const { message, isSuccess, isError } = businesses;

  useEffect(() => {
    const fetchPlatforms = async () => {
      const platforms = await getPlatform();
      setPlatforms(platforms);
    };

    fetchPlatforms();
  }, []);

  const { businessName, business_category, hasDigitalized, selectedPlatforms } =
    formData;

  const onChange = (e) => {
    if (e.target.name === "platform") {
      if (e.target.id === "offline") {
        setFormData((prev) =>
          e.target.checked
            ? {
                ...formData,
                hasDigitalized: false,
                selectedPlatforms: ["offline"],
              }
            : { ...formData, selectedPlatforms: [] }
        );
      } else {
        // If a new platform is selected, add it to the array of platforms
        // if the platform is already in the array, remove it
        if (selectedPlatforms.includes(e.target.id)) {
          setFormData({
            ...formData,
            hasDigitalized: formData.selectedPlatforms.length - 1 > 0,
            selectedPlatforms: selectedPlatforms.filter(
              (platform) => platform !== e.target.id
            ),
          });
        } else {
          setFormData({
            ...formData,
            hasDigitalized: true,
            selectedPlatforms: [...selectedPlatforms, e.target.id],
          });
        }
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (selectedPlatforms.length === 0) {
      toast({
        title: "Please select at least one platform",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const businessData = {
      businessName,
      business_category,
      hasDigitalized,
    };

    try {
      const response = await addBusiness(dispatch, businessData);
      if (isError) {
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      if (!response || !response.business_id) return;

      setNewBusiness(response.business_id);
      if (isSuccess) {
        toast({
          title: `Business added successfully! ${
            selectedPlatforms.length > 1 ? "Adding stores..." : ""
          }`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Add stores
        const business_id = response.business_id;
        if (!selectedPlatforms.includes("offline")) {
          selectedPlatforms.forEach(async (platform_id) => {
            const storeData = {
              business_id,
              platform_id,
            };
            const storeResponse = await addStore(storeData);
            if (!storeResponse) {
              toast({
                title: "Error",
                description: storeResponse.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            } else {
              toast({
                title: `Store ${storeResponse.store_name} added successfully`,
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }
          });
        }
      }

      setStatus((prev) => "Successfully added business!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (newBusiness && Number.isInteger(newBusiness)) {
      nav("/business/" + newBusiness);
    }
  }, [newBusiness, nav]);

  return (
    <>
      <section className="heading">
        <h1>
          <FaAddressCard /> Business Particulars
        </h1>

        <p>Input Your Business Details</p>
      </section>
      <section className="businessForm">
        <div className="container">
          <main>
            <div className="py-5 text-center">
              <img
                className="d-block mx-auto mb-4"
                src="/images/DigitalIT Logo.png"
                alt=""
                width="152"
                height="38"
              ></img>
              <h2>Business Particulars</h2>
              <p className="lead">
                Please fill in your business particulars below. All data are
                being kept safely and are important for us to generate accurate
                recommendation for your business growth.
              </p>
            </div>

            <div className="row g-5">
              <div>
                <h4 className="mb-3">General Information</h4>
                <form onSubmit={onSubmit}>
                  <Stack>
                    <FormControl isRequired>
                      <FormLabel htmlFor="businessName">
                        Business Name
                      </FormLabel>
                      <Input
                        type="text"
                        name="businessName"
                        onChange={onChange}
                        value={businessName}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel htmlFor="business_category">
                        Business Category
                      </FormLabel>
                      <Select name="business_category" onChange={onChange}>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option
                            key={category.category}
                            value={category.category}
                          >
                            {category.category}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="storePlatform">
                        Store Platform
                      </FormLabel>
                      <CheckboxGroup name="platform" defaultValue={"offline"}>
                        <Stack>
                          {[
                            {
                              platform_id: "offline",
                              platform_name: "Offline",
                            },
                          ]
                            .concat(platforms)
                            .map((platform) => (
                              <Checkbox
                                key={platform.platform_id}
                                name="platform"
                                id={platform.platform_id}
                                isDisabled={
                                  platform.platform_id !== "offline" &&
                                  formData.selectedPlatforms.includes("offline")
                                }
                                onChange={onChange}
                              >
                                {platform.platform_name}
                              </Checkbox>
                            ))}
                        </Stack>
                      </CheckboxGroup>
                    </FormControl>
                    <Button type="submit" variantColor="teal">
                      Add Business
                    </Button>
                  </Stack>
                </form>
              </div>
            </div>
          </main>

          <footer className="my-5 pt-5 text-muted text-center text-small">
            <p className="mb-1">&copy; 2022 DigitalIT</p>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="/">Privacy</a>
              </li>
              <li className="list-inline-item">
                <a href="/">Terms</a>
              </li>
              <li className="list-inline-item">
                <a href="/">Support</a>
              </li>
            </ul>
          </footer>
        </div>
      </section>
    </>
  );
}
