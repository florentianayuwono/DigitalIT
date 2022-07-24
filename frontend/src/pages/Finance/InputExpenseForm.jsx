import { Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
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
        <FormLabel htmlFor="expenseType">Expense Type</FormLabel>
        <Select>
          {expenseTypes?.map((expenseType) => (
            <option value={expenseType.expense_type}>
              {expenseType.expense_type}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="expenseValue">Expense Value</FormLabel>
        <Input type="number" placeholder="Expense Value" />
      </FormControl>
      <Button type="submit">Submit</Button>
    </form>
  )
}