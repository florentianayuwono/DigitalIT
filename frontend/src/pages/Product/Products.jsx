import { useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import PopupMessageButton from "../../components/PopupMessageButton";
import ProductSearchBar from "../../components/ProductSearchBar";
import { useProductContext } from "../../features/product/productContext";
import {
  deleteProduct,
  getProducts,
} from "../../features/product/productServices";

export default function Products() {
  const store_id = useParams().store_id;
  const { products, dispatch } = useProductContext();

  // When the component first mount, load the list of products.
  useEffect(() => {
    const getData = async () => {
      try {
        await getProducts(dispatch, { store_id });
      } catch (err) {
        console.error(err.message);
        return;
      }
    };

    getData();
  }, []);

  const deleteAction = async (product_local_id) => {
    try {
      await deleteProduct(dispatch, { product_local_id });
    } catch (err) {
      console.error(err.message);
      return;
    }
  };

  return (
    <>
      <div className="row align-items-md-stretch">
        {Object.keys(products.products)
          .filter((key) => products.products[key] !== undefined)
          .map((key) => {
            const product = products.products[key];

            return (
              <div className="col-md-6" key={key}>
                <div className="h-100 p-5 bg-light border rounded-3" key={key}>
                  <h3>{product.product_name}</h3>
                  <p> Description: {product.product_description}</p>
                  <p> Cost: {product.product_cost}</p>
                  <p> Price: {product.product_price}</p>
                  <PopupMessageButton
                    action={() => deleteAction(key)}
                    message="Are you sure to delete this product?"
                    title="Delete"
                    executeTitle="Delete"
                  />
                </div>
              </div>
            );
          })}
      </div>
      <div>
        <ProductSearchBar store_id={store_id} />
      </div>
    </>
  );
}
