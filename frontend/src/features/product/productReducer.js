/* 
Structure of products state:
{id: product}
where product is of structure: {
  id: number,

}
*/

function productWithoutID(rawProduct) {
  const { product_id, store_id, product_name, product_description, product_price, product_cost } = rawProduct;
  return {
    product_id,
    store_id,
    product_name,
    product_description,
    product_price,
    product_cost,
  };
}

export const initialProductState = {
  products: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return initialProductState;
    case "REQUEST_PRODUCT":
    case "REQUEST_PRODUCTS":
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: "",
      };
    case "GET_PRODUCTS_SUCCESS":
      let newProducts = {};
      action.payload.forEach(
        (product) =>
          (newProducts[product.product_local_id] = productWithoutID(product))
      );

      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: "",
        products: newProducts,
      };

    case "GET_PRODUCT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: "",
        products: {
          ...state.products,
          [action.payload.product_local_id]: productWithoutID(action.payload),
        },
      };
    case "GET_PRODUCTS_ERROR":
    case "GET_PRODUCT_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.error,
      };
    case "REQUEST_ADD_PRODUCT":
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: "",
      };
    case "ADD_PRODUCT_SUCCESS":
        return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: "",
      };
    case "ADD_LOCAL_PRODUCT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: "",
        products: {
          ...state.products,
          [action.payload.product_local_id]: productWithoutID(action.payload),
        },
      };
    case "ADD_PRODUCT_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.error,
      };
    case "REQUEST_DELETE_PRODUCT":
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: "",
      };
    case "DELETE_PRODUCT_SUCCESS":
      const newProductsWithoutDeleted = {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: "",
        products: {
          ...state.products,
          [action.payload.product_local_id]: undefined,
        },
      };

      return newProductsWithoutDeleted;
    case "DELETE_PRODUCT_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.error,
      };
    default:
      return state;
  }
};
