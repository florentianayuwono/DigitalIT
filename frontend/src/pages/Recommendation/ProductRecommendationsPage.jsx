import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useBusinessContext } from "../../features/business/businessContext";
import { getBusinesses } from "../../features/business/businessServices";
import { useProductContext } from "../../features/product/productContext";
import { getProducts } from "../../features/product/productServices";
import { getStore } from "../../features/store/storeServices";

export default function ProductRecommendationsPage() {
  const [inputHandlerState, setInputHandlerState] = useState({
    store: "",
    business: "",
  });
  const [stores, setStores] = useState([]);
  const [formData, setFormData] = useState({
    period: "",
    business: "",
    store: "",
  });

  const { period, business, store } = formData;
  const { businesses, dispatch: businessDispatch } = useBusinessContext();
  const { products, dispatch: productDispatch } = useProductContext();
  console.log(products);

  const selectBusiness = (e) => {
    e.preventDefault();
    setInputHandlerState({ ...inputHandlerState, business: e.target.value });
  };

  /*
    Next step: Don't forget to cleanup the useEffect when switching to a new business or store. 
  */

  // Get list of businesses when the component mounts
  useEffect(() => {
    const fetchBusinesses = async () => {
      await getBusinesses(businessDispatch);
    };
    fetchBusinesses();
  }, [businessDispatch]);

  // Get list of stores when a business is selected
  useEffect(() => {
    const fetchStores = async () => {
      const stores = await getStore({
        business_id: inputHandlerState.business,
      });
      setStores(stores);
    };

    if (inputHandlerState.business) {
      fetchStores();
    }
  }, [inputHandlerState.business]);

  // Get list of products inside a store after a store was selected
  useEffect(() => {
    const fetchProducts = async () => {
      await getProducts(productDispatch, {
        store_id: inputHandlerState.store,
      });
    };

    if (inputHandlerState.store) {
      fetchProducts();
    }
  }, [inputHandlerState.store, productDispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.id === "store") {
      setInputHandlerState({ ...inputHandlerState, store: e.target.value });
    }
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <form>
      <Stack spacing={4} align="center">
        <FormControl isRequired>
          <FormLabel htmlFor="period">Choose Period</FormLabel>
          <Select
            id="period"
            value={period}
            onChange={handleChange}
            placeholder="Choose Period"
          >
            <option value={0}>Daily Report</option>
            <option value={1}>Weekly Report</option>
            <option value={2}>Monthly Report</option>
            <option value={3}>Yearly Report</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="business">Choose Business</FormLabel>
          <Select
            id="business"
            value={inputHandlerState.business}
            onChange={selectBusiness}
            placeholder="Choose Business"
          >
            {businesses.businesses?.map((business) => (
              <option key={business.business_id} value={business.business_id}>
                {business.business_name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired isDisabled={inputHandlerState.business === ""}>
          <FormLabel htmlFor="store">Choose Store</FormLabel>
          <Select
            id="store"
            value={store}
            onChange={handleChange}
            placeholder="Choose Store"
          >
            {stores?.map((store) => (
              <option key={store.store_id} value={store.store_id}>
                {store.store_name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isDisabled={inputHandlerState.store === ""}>
          <FormLabel htmlFor="products">Product</FormLabel>
          <Select placeholder="Choose Product">
            {/* {products.products?.map((product) => (
          <option key={product.product_id} value={product.product_id}>
            {product.product_name}
          </option>
        ))} */}
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="teal">
          Submit Form
        </Button>
      </Stack>
    </form>
  );
}
