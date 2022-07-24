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
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { getStore } from "../../features/store/storeServices";
import { useBusinessContext } from "../../features/business/businessContext";
import { useProductContext } from "../../features/product/productContext";
import { getBusinesses } from "../../features/business/businessServices";
import {
  getProducts,
  productSalesInputHandler,
} from "../../features/product/productServices";

function IndividualProductDisplayOption({ id, product, storage }) {
  const [productSales, setProductSales] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (productSales > 0 && isChecked) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    return () => {
      setIsValid(false);
    };
  }, [productSales, isChecked]);

  const handleChange = (e) => {
    setProductSales(e.target.value);
    storage.product_sales = e.target.value;
  };

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
    storage.isChecked = e.target.checked;
  };

  return (
    <div>
      <FormControl
        isInvalid={!isValid && isChecked}
        isRequired={isChecked && isValid}
      >
        <FormErrorMessage>Please enter a valid number</FormErrorMessage>
        <InputGroup>
          <InputLeftAddon
            children={<>{product.product_name}</>}
            minWidth="300px"
          />
          <Input
            id={id}
            type="number"
            value={productSales === 0 ? undefined : productSales}
            onChange={handleChange}
            isDisabled={!isChecked}
            placeholder="quantity sold during the period"
          />

          <InputRightAddon
            children={
              <>
                <Checkbox
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckbox}
                />
              </>
            }
          />
        </InputGroup>
      </FormControl>
    </div>
  );
}

export default function InputProductSales() {
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
  const storedInputData = useRef({});

  const { period, business, store } = formData;

  const { businesses, dispatch: businessDispatch } = useBusinessContext();
  const { products, dispatch: productDispatch } = useProductContext();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
      const businesses = await getBusinesses(businessDispatch);
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
      const products = await getProducts(productDispatch, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      period,
      ...storedInputData.current,
    };

    const response = await productSalesInputHandler(productDispatch, data);
  };

  useEffect(() => {
    if(products.isSuccess) {
      toast({
        title: "Success",
        description: "Product sales were successfully inputted",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else if(products.isError) {
      toast({
        title: "Error",
        description: products.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    if (products.isLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [products.isError, products.isLoading, products.isSuccess, products.message, toast]);

  return (
    <form onSubmit={handleSubmit}>
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
      <FormLabel htmlFor="products">Products</FormLabel>
      {Object.keys(products.products).map((productId) => {
        storedInputData.current[productId] = {
          product_sales: 0,
          isChecked: false,
        };

        return (
          <IndividualProductDisplayOption
            key={productId}
            id={productId}
            product={products.products[productId]}
            storage={storedInputData.current[productId]}
          />
        );
      })}
      <Stack direction="row" align="center" >
      <Button type="submit" colorScheme="teal">
        Submit Form
      </Button>
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (<></>)}
      </Stack>
    </form>
  );
}
