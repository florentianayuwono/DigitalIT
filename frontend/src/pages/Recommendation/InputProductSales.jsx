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
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getStore } from "../../features/store/storeServices";
import { useBusinessContext } from "../../features/business/businessContext";
import { useProductContext } from "../../features/product/productContext";
import { getBusinesses } from "../../features/business/businessServices";
import { getProducts } from "../../features/product/productServices";

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

  const { period, business, store } = formData;

  const { businesses, dispatch: businessDispatch } = useBusinessContext();
  const { products, dispatch: productDispatch } = useProductContext();

  const selectBusiness = (e) => {
    e.preventDefault();
    setInputHandlerState({ ...inputHandlerState, business: e.target.value });
  };

  useEffect(() => {
    const fetchBusinesses = async () => {
      const businesses = await getBusinesses(businessDispatch);
    };
    fetchBusinesses();
  }, []);

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

  useEffect(() => {
    const fetchProducts = async () => {
      
    }
  })

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
            <option key={store.store_id}>{store.store_name}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl
        isRequired
        isDisabled={inputHandlerState.store === ""}
      >
        <FormLabel>
          Test
        </FormLabel>
      </FormControl>
    </form>
  );
}
