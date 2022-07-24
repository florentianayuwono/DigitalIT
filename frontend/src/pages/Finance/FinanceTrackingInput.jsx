import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function FinanceTrackingInput() {
  const navigate = useNavigate();
  const [radioValue, setRadioValue] = useState("expense");

  useEffect(() => {
    navigate(radioValue);
  }, [navigate, radioValue]);

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="period">Period</FormLabel>
        <Select>
          <option value="Daily Report">Daily Report</option>
          <option value="Weekly Report">Weekly Report</option>
          <option value="Monthly Report">Monthly Report</option>
          <option value="Yearly Report">Yearly Report</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="inputType">Input Type</FormLabel>
        <RadioGroup onChange={setRadioValue} value={radioValue}>
          <Stack direction="column">
            <Radio id="inputType" value="expense">
              Expense
            </Radio>
            <Radio id="inputType" value="trialbalance" onSelect={() => navigate("trialbalance")}>
              Trial Balance
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <Outlet />
    </>
  );
}
