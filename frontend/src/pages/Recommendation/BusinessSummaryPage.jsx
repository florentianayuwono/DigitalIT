/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import BusinessSummary from "../../components/BusinessSummary";
import { useBusinessContext } from "../../features/business/businessContext";
import { getBusinesses } from "../../features/business/businessServices";

export default function BusinessSummaryPage() {
  const [date_range, setDateRange] = useState(0);
  const [selectedBusiness, setSelectedBusiness] = useState();
  const { businesses, dispatch: dispatchBusiness } = useBusinessContext();
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const fetchBusinesses = async () => {
      await getBusinesses(dispatchBusiness);
    };
    fetchBusinesses();
  }, []);

  useEffect(() => {
    setSubmit(false);
  }, [date_range, selectedBusiness]);

  const handleChange = (e) => {
    setSelectedBusiness(e.target.value);
  };

  return (
    <>
      <FormControl isRequired>
        <FormLabel htmlFor="inputDate">Date Range</FormLabel>
        <RadioGroup onChange={setDateRange} value={date_range}>
          <Stack direction="column">
            <Radio id="inputDate" value="0">
              Last Day
            </Radio>
            <Radio id="inputDate" value="1">
              Last Week
            </Radio>
            <Radio id="inputDate" value="2">
              Last Month
            </Radio>
            <Radio id="inputDate" value="3">
              Last Year
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="inputBusiness">Business</FormLabel>
        <Select onChange={handleChange}>
          {businesses.businesses.map((business) => (
            <option key={business.business_id} value={business.business_id}>
              {business.business_name}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button
        type="generate"
        colorScheme="teal"
        onClick={() => setSubmit(true)}
        loadingText="Generating report"
        isLoading={businesses.isLoading}
      >
        Generate Report
      </Button>
      {submit ? (
        <BusinessSummary
          date_range={date_range}
          business_id={selectedBusiness}
        />
      ) : (
        ""
      )}
    </>
  );
}
