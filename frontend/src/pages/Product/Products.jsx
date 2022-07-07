import { useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useProductContext } from "../../features/product/productContext";
import { getProducts } from "../../features/product/productServices";

export default function Products() {
  const business_id = useParams().business_id;
  const { products, dispatch } = useProductContext();
  const nav = useNavigate();

  // When the component first mount, load the list of products.

  useEffect(() => {
    const getData = async () => {
      try {
        await getProducts(dispatch, { business_id });
      } catch (err) {
        console.error(err.message);
        return;
      }
    };

    getData();
  }, []);

  return (
    <div className="row align-items-md-stretch">
      {Object.keys(products.products).map((key) => {
        const product = products.products[key];

        return (
          <div className="col-md-6" key={product.product_id}>
            <div className="h-100 p-5 bg-light border rounded-3" key={product.product_id}>
              <h3>{product.product_name}</h3>
              <p> Description: {product.product_description}</p>
              <p> Price: {product.price}</p>
              <p> Cost: {product.cost}</p>
            </div>
          </div>
        );
      })}
      <div className="col-md-6">
        <div
          className="btn h-100 p-5 border-solid rounded-3"
          onClick={() => nav(`addProduct`)}
        >
          <h3>Add New Product</h3>
        </div>
      </div>
    </div>
  );
}
