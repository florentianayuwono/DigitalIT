import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchProduct } from "../features/product/productServices";
import PopupMessageButton from "./PopupMessageButton";
import ProductSearchResultItem from "./ProductSearchResultItem";

export default function ProductSearchBar({ store_id, onAdd }) {
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const nav = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const result = await searchProduct(keyword);
    if (result?.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      setSearch(result);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <FormControl>
          <FormLabel htmlFor="search" className="mt-3">
            Add a new product to this store
          </FormLabel>
          <Input
            id="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <FormHelperText className="mb-3">Search for a product name.</FormHelperText>
          <FormErrorMessage>Please enter a product name.</FormErrorMessage>
          <Button type="submit" className="mb-3">Search</Button>
        </FormControl>
      </form>
      <div>
        {/* FOR IMPROVEMENTS: Show only products that are not on the store yet */}
        {!isEmpty ? (
          search.map((product) => (
            <ProductSearchResultItem
              key={product.product_id}
              product={product}
              store_id={store_id}
              onAdd={onAdd}
            />
          ))
        ) : (
          <PopupMessageButton
            action={() => nav("/business/addProduct")}
            message="Do you wish to input a new product?"
            title="No result found, do you wish to add a new product?"
            executeTitle={"Yes"}
            colorScheme="blue"
          />
        )}
      </div>
    </>
  );
}
