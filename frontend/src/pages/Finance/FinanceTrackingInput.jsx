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
import InputExpenseForm from "./InputExpenseForm";
import InputTrialBalanceForm from "./InputTrialBalanceForm";

export default function FinanceTrackingInput() {
  const navigate = useNavigate();
  const [radioValue, setRadioValue] = useState("");

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="inputType">Input Type</FormLabel>
        <RadioGroup onChange={setRadioValue} value={radioValue}>
          <Stack direction="column">
            <Radio id="inputType" value="expense">
              Expense
            </Radio>
            <Radio id="inputType" value="trialbalance">
              Trial Balance
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      {radioValue === "expense" ? (
        <InputExpenseForm />
      ) : radioValue === "trialbalance" ? (
        <InputTrialBalanceForm />
      ) : null}
    </>
  );
}
