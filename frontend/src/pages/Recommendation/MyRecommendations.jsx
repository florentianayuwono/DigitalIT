/* eslint-disable react-hooks/exhaustive-deps */
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  FormControl,
  Select,
  FormLabel,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useBusinessContext } from "../../features/business/businessContext";
import { getBusinesses } from "../../features/business/businessServices";

// This function checks if all the businesses are not digitalized
// If they are not, it returns true, otherwise it returns false
const checkIfAllBusinessesAreNotDigitalized = (businesses) => {
  for (let i = 0; i < businesses.length; i++) {
    if (businesses[i].has_digitalized) {
      return false;
    }
  }
  return true;
};

export default function MyRecommendations() {
  const { businesses, dispatch: businessDispatch } = useBusinessContext();
  const [selectedBusiness, setSelectedBusiness] = useState();
  const [submit, setSubmit] = useState(false);
  const { isLoading, error } = businesses;

  // Fetch the businesses
  useEffect(() => {
    getBusinesses(businessDispatch);
  }, []);

  useEffect(() => {
    setSubmit(false);
  }, [selectedBusiness]);

  return (
    <Stack spacing="10">
      <FormControl isRequired>
        <FormLabel htmlFor="inputBusiness">Business</FormLabel>
        <Select onChange={(e) => setSelectedBusiness(e.target.value)}>
          {businesses.businesses.map((business) => (
            <option key={business.business_id} value={business.business_id}>
              {business.business_name}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={() => setSubmit(true)}
        isLoading={isLoading}
        loadingText="..."
        isDisabled={isLoading}
      >
        Generate Recommendations
      </Button>
      {submit ? (
        <Accordion defaultIndex={[0]} allowMultiple allowToggle>
          {businesses.businesses.length === 0 ? (
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
                  <container flex="1" textAlign="left">
                    Create a business
                  </container>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                You do not have a business yet. Try creating one and fill out
                the particulars in order to see our recommendation. For your
                inspiration, here is our data on high performers products.
              </AccordionPanel>
            </AccordionItem>
          ) : (
            <></>
          )}
          {/* Find the business selected, and then check if the business has been digitalized */}
          {!businesses.businesses.find(
            (business) => business.business_id === parseInt(selectedBusiness)
          )?.has_digitalized ? (
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
                  <container flex="1" textAlign="left">
                    Digitalize your business
                  </container>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Start digitalizing your business by opening a seller account!
                Based on our analysis, your business will thrive on this
                platform.
              </AccordionPanel>
            </AccordionItem>
          ) : (
            <>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
                    <container flex="1" textAlign="left">
                      Use suitable platform
                    </container>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Congrats on digitalizing your business! You might also want to
                  consider opening a store on this platform.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
                    <container flex="1" textAlign="left">
                      Increase your reputation
                    </container>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Earn more trust by customers by having a verified seller
                  account! Follow the guides here to activate your special
                  seller account.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
                    <container flex="1" textAlign="left">
                      Predatory pricing
                    </container>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Sometimes, it is good to have a lower price than your
                  competitors. Based on our analysis, you are capable of
                  lowering your price. Attract more customers!
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
                    <container flex="1" textAlign="left">
                      Be an influencer
                    </container>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  It is time to make your business famous! Start creating an
                  account on Instagram, TikTok or Facebook and upload contents
                  regularly to expand your reach.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
                    <container flex="1" textAlign="left">
                      Advertising Genius
                    </container>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Facebook or Instagram ads feature might be your next best
                  friend. Discover how they can help you attract new customers
                  here.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
                    <container flex="1" textAlign="left">
                      Giveaway is the way
                    </container>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  You can hire local influencers (2- 10K followers) to promote
                  your giveaway and review your products. New customers will be
                  able to test out your awesome products!
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
                    <container flex="1" textAlign="left">
                      Aesthetics matters
                    </container>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Your product cataloge is the first thing the customers look
                  at! Invest in better image quality. Don't worry, here are some
                  cheap but good photographers that we have found for you.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
                    <container flex="1" textAlign="left">
                      Exploit your popularity
                    </container>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  You are quite successful in selling this product. Might want
                  to try selling its siblings? You can start by selling this,
                  that and there.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
                    <container flex="1" textAlign="left">
                      Discover new category
                    </container>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Your current product is complementary with this product
                  category. You can try selling them both and make your
                  customers more attached to you!
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
                    <container flex="1" textAlign="left">
                      Time to expand your business
                    </container>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Congrats! You are pretty famous in this platform. Are you up
                  to the challenge of starting in another platfrom? Here is our
                  recommendation on the next best place to sell your products.
                </AccordionPanel>
              </AccordionItem>
            </>
          )}
        </Accordion>
      ) : (
        <></>
      )}
    </Stack>
  );
}
