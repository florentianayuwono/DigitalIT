import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useBusinessContext } from "../../features/business/businessContext";
import { getBusinesses } from "../../features/business/businessServices";
import { useProductContext } from "../../features/product/productContext";
import {
  compareGlobalSales,
  getProducts,
} from "../../features/product/productServices";
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
    product: "",
  });

  const { period, store, product } = formData;
  const { businesses, dispatch: businessDispatch } = useBusinessContext();
  const { products, dispatch: productDispatch } = useProductContext();
  const [submitted, setSubmitted] = useState(false);
  const [productMessage, setProductMessage] = useState("");
  const [loading, isLoading] = useState(false);

  /*
    Next step: Don't forget to cleanup the useEffect when switching to a new business or store. 
  */

  // Get list of businesses when the component mounts
  useEffect(() => {
    const fetchBusinesses = async () => {
      await getBusinesses(businessDispatch);
    };
    setSubmitted(false);
    fetchBusinesses();
  }, [businessDispatch]);

  // Get list of stores when a business is selected
  useEffect(() => {
    const fetchStores = async () => {
      const stores = await getStore({
        business_id: inputHandlerState.business,
      });
      setSubmitted(false);
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
    setSubmitted(false);
    if (e.target.id === "store") {
      setInputHandlerState({ ...inputHandlerState, store: e.target.value });
      setFormData({ ...formData, product: "" });
    } else if (e.target.id === "business") {
      setInputHandlerState({ store: "", business: e.target.value });
      setFormData({ ...formData, product: "" });
    }
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    isLoading(true);
    const compare = await compareGlobalSales({
      product_local_id: product,
      date_range: period,
    });
    setSubmitted(true);
    isLoading(false);

    if (compare && Object.keys(compare).length === 1) {
      setProductMessage("Uh oh! " + compare.message);
    } else {
      setProductMessage(
        `${
          compare.message
        }: The quantity sold of this product in this store is ${
          parseFloat(compare.quantileRank) * 100
        }% more than the global sales of the same product.`
      );
    }
  };

  return (
    <Stack spacing={4} align="center">
      <FormControl isRequired>
        <FormLabel htmlFor="period">Choose Period</FormLabel>
        <Select
          id="period"
          value={period}
          onChange={handleChange}
          placeholder="Choose period to compare product sales with"
        >
          <option value={0}>Daily Data</option>
          <option value={1}>Weekly Data</option>
          <option value={2}>Monthly Data</option>
          <option value={3}>Yearly Data</option>
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="business">Choose Business</FormLabel>
        <Select
          id="business"
          value={inputHandlerState.business}
          onChange={handleChange}
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
        <Select
          placeholder="Choose Product"
          id="product"
          value={product}
          onChange={handleChange}
        >
          {Object.keys(products.products).map((product_local_id) => (
            <option key={product_local_id} value={product_local_id}>
              {products.products[product_local_id].product_name}
            </option>
          ))}
        </Select>
      </FormControl>

      <Button colorScheme="teal" onClick={handleSubmit}>
        Get Product Insights
      </Button>

      {submitted ? (
        <div>
          {/* Use the ':' of the productMessage as a line separator, the first line is a h3*/}
          {productMessage.split(":").map((line, index) => (
            <>
              {/* If the line is the first line, it is a h3*/}
              {index === 0 ? (
                <h3 key={index}>{line}</h3>
              ) : (
                <p key={index}>{line}</p>
              )}
            </>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      {loading ? <CircularProgress isIndeterminate /> : <></>}
    </Stack>
  );
}
