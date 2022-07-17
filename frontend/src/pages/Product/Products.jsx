import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";
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

  const deleteAction = async (product_id) => {
    try {
      await deleteProduct(dispatch, { product_id, business_id });
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
                  <p> Price: {product.price}</p>
                  <p> Cost: {product.cost}</p>
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
        <div className="col-md-6">
          <div
            className="btn h-100 p-5 border-solid rounded-3"
            onClick={() => nav(`addProduct`)}
          >
            <h3>Add New Product</h3>
          </div>
        </div>
      </div>
      <div>
        <ProductSearchBar />
      </div>
    </>
  );
}
