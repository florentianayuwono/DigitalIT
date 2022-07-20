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
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { getStore } from "../../features/store/storeServices";
import { useBusinessContext } from "../../features/business/businessContext";
import { useProductContext } from "../../features/product/productContext";
import { getBusinesses } from "../../features/business/businessServices";
import { getProducts } from "../../features/product/productServices";
import PopupMessageButton from "../../components/PopupMessageButton";

function IndividualProductDisplayOption({ id, product, storage }) {
  const [productSales, setProductSales] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (storage) {
      setProductSales(storage.product_sales);
      setIsChecked(storage.isChecked);
    }
  }, [storage]);

  const handleChange = (e) => {
    setProductSales(e.target.value);
    storage.product_sales = e.target.value;
    console.log(storage);
  };

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
    storage.isChecked = e.target.checked;
  };

  return (
    <div>
      <FormControl>
        <FormLabel htmlFor={id}>{product.product_name}</FormLabel>
        <InputGroup>
          <InputLeftAddon
            children={
              <Checkbox
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckbox}
              />
            }
          />
          <Input
            id={id}
            type="number"
            value={productSales}
            onChange={handleChange}
            isDisabled={!isChecked}
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
  console.log(storedInputData.current);

  const { period, business, store } = formData;

  const { businesses, dispatch: businessDispatch } = useBusinessContext();
  const { products, dispatch: productDispatch } = useProductContext();

  const selectBusiness = (e) => {
    e.preventDefault();
    setInputHandlerState({ ...inputHandlerState, business: e.target.value });
  };

  // Get list of businesses when the component mounts
  useEffect(() => {
    const fetchBusinesses = async () => {
      const businesses = await getBusinesses(businessDispatch);
    };
    fetchBusinesses();
  }, []);

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

  return (
    <form>
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
      {Object.keys(products.products).map((productId) => {
        storedInputData.current[productId] = {product_sales: 0, isChecked: false};

        return (
        <IndividualProductDisplayOption
          key={productId}
          id={productId}
          product={products.products[productId]}
          storage={storedInputData.current[productId]}
        />);
        })}
      <PopupMessageButton/>
    </form>
  );
}
