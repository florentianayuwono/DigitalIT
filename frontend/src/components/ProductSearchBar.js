import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Container,
  RadioGroup,
  Stack,
  Radio,
  Box,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useState } from "react";
import { searchProduct } from "../features/product/productServices";

export default function ProductSearchBar() {
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState([]);
  const [selected, setSelected] = useState({});
  console.log(selected);

  const handleSearch = async (e) => {
    e.preventDefault();
    const result = await searchProduct(keyword);
    setSearch(result);
  };

  const handleAddProduct = async (e) => {
    // e.preventDefault;
    // const product = selected
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <FormControl>
          <FormLabel htmlFor="search">Search</FormLabel>
          <Input
            id="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <FormHelperText>Search for a product name.</FormHelperText>
          <FormErrorMessage>Please enter a product name.</FormErrorMessage>
          <Button type="submit">Search</Button>
        </FormControl>
      </form>
      <div>
        {/* FOR IMPROVEMENTS: Show only products that are not on the store yet */}
        {search.map((product) => (
          <InputGroup>
            {/* FOR IMPROVEMENTS: Add modal here for left addon to show full product description */}
            <InputLeftAddon minWidth={"400"} children={product.product_name} />
            <Input type="number" maxWidth={"120"} placeholder="cost" />
            <Input type="number" maxWidth={"120"} placeholder="price" />
            <InputRightAddon children={<Button>Add Product to Store</Button>} />
          </InputGroup>
        ))}
      </div>
    </>
  );
}
