import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useProductContext } from "../../features/product/productContext";
import { getProducts } from "../../features/product/productServices";

export default function Products() {
  const business_id = useParams().business_id;
  const { products, dispatch } = useProductContext();

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

  console.log(products.products);

  return (
    <div className="row align-items-md-stretch">
      {/* {products.products.map((product) => (
        <div className="col-md-4" key={product.product_id}>
          <p>{product.product_name}</p>
          <p>{product.product_description}</p>
          <p>{product.price}</p>
          <p>{product.cost}</p>
        </div>
      ))} */}
    </div>
  );
}
