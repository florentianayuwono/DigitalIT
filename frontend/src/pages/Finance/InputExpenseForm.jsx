import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

const initialExpenseTypes = [
  { expense_type: "food" },
  { expense_type: "transport" },
  { expense_type: "other" },
];

export default function InputExpenseForm({ period }) {
  const [expenseTypes, setExpenseTypes] = useState(initialExpenseTypes);

  return (
    <form>
      <FormControl>
        <FormLabel htmlFor="period" className="mt-3">
          Period
        </FormLabel>
        <Select>
          <option value="Daily Report">Daily Report</option>
          <option value="Weekly Report">Weekly Report</option>
          <option value="Monthly Report">Monthly Report</option>
          <option value="Yearly Report">Yearly Report</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="expenseType" className="mt-3">
          Expense Type
        </FormLabel>
        <Select>
          {expenseTypes?.map((expenseType) => (
            <option value={expenseType.expense_type}>
              {expenseType.expense_type}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="expenseValue" className="mt-3">
          Expense Value
        </FormLabel>
        <Input type="number" placeholder="Expense Value" />
      </FormControl>
      <Button type="submit" className="mt-3">
        Submit
      </Button>
    </form>
  );
}
