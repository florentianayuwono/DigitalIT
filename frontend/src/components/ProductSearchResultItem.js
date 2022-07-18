import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import { useState } from "react";
import { addLocalProduct } from "../features/product/productServices";
import PopupMessageButton from "./PopupMessageButton";

export default function ProductSearchResultItem({ product, store_id, onAdd }) {
  const [inputData, setInputData] = useState({
    product_cost: "",
    product_price: "",
  });

  const { product_cost, product_price } = inputData;

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const result = await addLocalProduct({
      product_id: product.product_id,
      store_id: store_id,
      product_cost: product_cost,
      product_price: product_price,
    });
  };

  const handleInputChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <InputGroup>
      {/* FOR IMPROVEMENTS: Add modal here for left addon to show full product description */}
      <InputLeftAddon minWidth={"400"} children={product.product_name} />
      <Input
        type="number"
        name="product_cost"
        value={product_cost}
        onChange={handleInputChange}
        maxWidth={"120"}
        placeholder="cost"
      />
      <Input
        type="number"
        name="product_price"
        value={product_price}
        onChange={handleInputChange}
        maxWidth={"120"}
        placeholder="price"
      />
      <InputRightAddon
        children={
          <PopupMessageButton
            action={handleAddProduct}
            message={"Are you sure to add this product?"}
            title="Add Product to Store"
            executeTitle={"Add"}
            colorScheme="gray"
          />
          // <Button onClick={handleAddProduct}>
          //   Add Product to Store
          // </Button>
        }
      />
    </InputGroup>
  );
}
