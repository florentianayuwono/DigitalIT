import { useProductContext } from "../../features/product/productContext";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addProduct } from "../../features/product/productServices";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";

const productCategories = [
  "Food and Groceries",
  "Fashion and Clothings",
  "Electronics",
  "Hardware",
  "Health and Beauty",
  "Home and Garden",
  "Automotive",
  "Travel and Leisure",
  "Pet Supplies",
  "Sports and Outdoors",
  "Toys and Games",
  "Baby and Children",
  "Art and Collectibles",
  "Other",
];

export default function AddProduct() {
  const { dispatch } = useProductContext();
  const nav = useNavigate();
  const [productForm, setProductForm] = useState({
    product_name: "",
    product_description: "",
    product_category: "",
    age_target: "",
    gender_target: "",
  });

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await addProduct(dispatch, productForm);
      if (!response) return;

      nav(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setProductForm({ ...productForm, [e.target.id]: e.target.value });
  };

  return (
    <Container>
      <h1>Add a New Product</h1>
      <form onSubmit={onSubmitForm}>
        <FormControl isRequired>
          <FormLabel htmlFor="product_name">Product Name</FormLabel>
          <Input
            id="product_name"
            value={productForm.product_name}
            onChange={onChange}
            placeholder="Cat Food"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="product_description">
            Product Description
          </FormLabel>
          <Textarea
            id="product_description"
            onChange={onChange}
            value={productForm.product_description}
            placeholder="Cat Food ABC With Tuna, 200 gr"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="product_category">Product Category</FormLabel>
          {/* Options: hardware, automotive, home appliances */}
          <Select
            placeholder="Please select a category"
            id="product_category"
            onChange={onChange}
          >
            {productCategories.map((category) => (
              <option key={category} value={category}>
                {category
                  .split(" ")
                  .map((word) =>
                    word === "and"
                      ? word
                      : word[0].toUpperCase() + word.substring(1)
                  )
                  .join(" ")}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="age_target">Age Target</FormLabel>
          <Select
            placeholder="Who will buy this product?"
            id="age_target"
            onChange={onChange}
          >
            <option value="0">All Age</option>
            <option value="1">Kids</option>
            <option value="2">Teenagers</option>
            <option value="3">Adults</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="gender_target">Gender Target</FormLabel>
          <Select
            placeholder="Please select an option"
            id="gender_target"
            onChange={onChange}
          >
            <option value="0">All Genders</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
          </Select>
        </FormControl>
        <Button type="submit">Add This Product</Button>
      </form>
    </Container>
  );

  /*return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="h-100 p-5 bg-light border rounded-3">
            <h3>Add New Product</h3>
            <form onSubmit={onSubmitForm}>
              <div className="form-group">
                <label htmlFor="product_name">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="product_name"
                  name="product_name"
                  value={productForm.product_name}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="product_description">Product Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="product_description"
                  name="product_description"
                  value={productForm.product_description}
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
  );*/
}
