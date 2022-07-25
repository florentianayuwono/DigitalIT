/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getBestBusinessPlatform } from "../../features/business/businessServices";

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

export default function StartDigitalizing({ business }) {
  // const [categories, setCategories] = useState(listOfCategories);
  const [platforms, setPlatforms] = useState({});
  const { business_id, business_category } = business;
  const [isLoading, setIsLoading] = useState(false);
  console.log(platforms);
  // const [selectedCategory, setSelectedCategory] = useState("");

  // const handleSelect = (e) => {
  //   setSelectedCategory(e.target.value);
  //   setIsLoading(true);
  // };

  useEffect(() => {
    const getBestPlatform = async () => {
      const bestPlatform = await getBestBusinessPlatform({
        business_category,
        business_id,
      });
      setPlatforms(bestPlatform);
    };

    getBestPlatform();
  }, []);

  useEffect(() => {
    if (Object.keys(platforms).length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [platforms]);

  return (
    <Stack>
      {isLoading ? (
        <CircularProgress isIndeterminate />
      ) : (
        <>
          Start digitalizing your business by opening a seller account! Based on
          our analysis, your business will thrive on the platform {
            <Text as="mark">{platforms.bestPlatform}</Text>
          }.
        </>
      )}
    </Stack>
  );
}
