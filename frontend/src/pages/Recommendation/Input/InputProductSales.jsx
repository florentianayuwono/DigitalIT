/**
 * A form where people can input their product sales.
 * 
 * Structure:
 * FORM
 *  - Choose Period
 *  - List of Stores
 *    - List of Products
 *      [Produt Name | Product Sales (number input) | Checkbox] 
 */
import { FormControl, FormLabel, Select } from "@chakra-ui/react"

export default function InputProductSales() {
  return (
    <form>
      <FormControl>
        <FormLabel htmlFor="period">Choose Period</FormLabel>
        <Select id="period" name="period" placeholder="Choose Period">
          <option>Weekly Report</option>
          <option>Monthly Report</option>
          <option>Yearly Report</option>
        </Select>

      </FormControl>
    </form>
  )
}