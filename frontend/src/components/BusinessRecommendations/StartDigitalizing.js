/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getBestBusinessPlatform } from "../../features/business/businessServices";


export default function StartDigitalizing({ business }) {
  // const [categories, setCategories] = useState(listOfCategories);
  const [platforms, setPlatforms] = useState({});
  const { business_id, business_category } = business;
  const [isLoading, setIsLoading] = useState(false);
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
    <>
      {isLoading ? (
        <CircularProgress isIndeterminate />
      ) : (
        <>
          Start digitalizing your business by opening a seller account! Based on
          our analysis, your business will thrive on the platform {<Text as="mark">{platforms.bestPlatform}</Text>}.
        </>
      )}
    </>
  );
}
