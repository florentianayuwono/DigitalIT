import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { searchProduct } from "../features/product/productServices";
import ProductSearchResultItem from "./ProductSearchResultItem";

export default function ProductSearchBar() {
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const result = await searchProduct(keyword);
    setSearch(result);
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
          <ProductSearchResultItem product={product} />
        ))}
      </div>
    </>
  );
}
