/* 
Structure of products state:
{id: product}
where product is of structure: {
  id: number,
  
}
*/

export const initialProductState = {
  products: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};