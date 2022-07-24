import { FormControl, FormLabel, Select } from "@chakra-ui/react";

export default function FinanceTrackingInput() {
  return (
    <form>
      <FormControl>
        <FormLabel htmlFor="period">Period</FormLabel>
        <Select>
          <option value="Daily Report">Daily Report</option>
          <option value="Weekly Report">Weekly Report</option>
          <option value="Monthly Report">Monthly Report</option>
          <option value="Yearly Report">Yearly Report</option>
        </Select>
      </FormControl>
    </form>
  )
}