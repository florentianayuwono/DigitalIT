/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getBestBusinessPlatform } from "../../features/business/businessServices";

function NoPlatform() {
  return (
    <>
      Congrats on digitalizing your business! You might also want to consider
      opening a store on this platform.
    </>
  );
}

function NotBestPlatform({ platforms, business_category }) {
  return (
    <>
      <h4>Congrats on digitalizing your business!</h4>
      <Text>
        However, you have not used the best platform for your business category.
        Your business's category is {<Text as="mark">{business_category}</Text>}{" "}
        and the best store platform for that according to our data is{" "}
        {<Text as="mark"> {platforms.bestPlatform}</Text>}.
      </Text>
    </>
  );
}

function AlreadyBestPlatform({ platforms, business_category }) {
  return (
    <Text>
      <h4>You are on the right track!</h4>
      You have already used the best platform for your business category. Your
      business's category is {<Text as="mark">{business_category}</Text>} and
      the best store platform for that according to our data is{" "}
      {<Text as="mark">{platforms.bestPlatform}</Text>}.
    </Text>
  );
}

export default function SuitablePlatform({ business }) {
  const { business_id, business_category } = business;
  const [platforms, setPlatforms] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const thisBusinessPlatforms = platforms.thisBusinessPlatforms
    ? Object.keys(platforms.thisBusinessPlatforms)
    : [];

  useEffect(() => {
    const getBestPlatform = async () => {
      const bestPlatform = await getBestBusinessPlatform({
        business_id,
        business_category,
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
      {isLoading ? <CircularProgress isIndeterminate />
      : thisBusinessPlatforms.length === 0 ? (
        <NoPlatform />
      ) : !platforms?.isBest ? (
        <NotBestPlatform
          platforms={platforms}
          business_category={business_category}
        />
      ) : (
        <AlreadyBestPlatform platforms={platforms} business_category={business_category} />
      )}
    </>
  );
}
