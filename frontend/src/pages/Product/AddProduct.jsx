import { useProductContext } from "../../features/product/productContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  // const { products, dispatch } = useProductContext();
  const nav = useNavigate();
  const [productForm, setProductForm] = useState({
    productName: "",
    productDescription: "",
    price: "",
    cost: "",
  });
  

  const onChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="h-100 p-5 bg-light border rounded-3">
            <h3>Add New Product</h3>
            <form>
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  name="productName"
                  value={productForm.productName}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productDescription">Product Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="productDescription"
                  name="productDescription"
                  value={productForm.productDescription}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={productForm.price}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cost">Cost</label>
                <input
                  type="number"
                  className="form-control"
                  id="cost"
                  name="cost"
                  value={productForm.cost}
                  onChange={onChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}