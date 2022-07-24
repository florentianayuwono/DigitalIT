import { Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useState } from "react";

const initialAssets = [
  {asset_name: "cash"},
  {asset_name: "bank"},
  {asset_name: "other"},
];

const initialLiabilities = [
  {liability_name: "loan"},
  {liability_name: "other"},
];

export default function InputTrialBalanceForm({ period }) {
  const [assetType, setAssetType] = useState(initialAssets);
  const [liabilityType, setLiabilityType] = useState(initialLiabilities);

  return (
    <form>
      <FormControl>
        <FormLabel htmlFor="assetType">Asset Type</FormLabel>
        <Select>
        {assetType?.map((asset) => (
          <option value={asset.asset_name}>{asset.asset_name}</option>
        ))}
        </Select>
        <Input type="number" placeholder="Asset Value" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="liabilityType">Liability Type</FormLabel>
        <Select>
        {liabilityType?.map((liability) => (
          <option value={liability.liability_name}>{liability.liability_name}</option>
        ))}
        </Select>
        <Input type="number" placeholder="Liability Value" />
      </FormControl>
      <Button type="submit">Submit</Button>
    </form>
  )
}
