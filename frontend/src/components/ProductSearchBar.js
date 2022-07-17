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
} from "@chakra-ui/react";
import { useState } from "react";
import { searchProduct } from "../features/product/productServices";

export default function ProductSearchBar() {
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState([]);
  const [selected, setSelected] = useState({});
  console.log(selected);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await searchProduct(keyword);
    setSearch(result);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
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
      <RadioGroup onChange={setSelected} value={selected}>
        <Stack direction={"column"}>
          {search?.map((product) => (
            <Radio value={product.product_id} key={product.product_id}>
              {product.product_name}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Container>
  );
}
