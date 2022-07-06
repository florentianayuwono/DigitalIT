import { useAuthContext } from "../features/auth/authContext";
import { FaAddressCard } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useBusinessContext } from "../features/business/businessContext";
import { addBusiness } from "../features/business/businessServices";
import { useNavigate } from "react-router-dom";

export default function InputBusinessParticular() {
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    hasDigitalized: "",
    productName: "",
    productDescription: "",
    price: "",
    cost: "",
    platform: "",
  });
  const { businesses, dispatch } = useBusinessContext();
  const { user } = useAuthContext();
  const [isSubmitted, refresh] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (!user.user) {
      nav("/login");
    }
  });

  // Message to be shown (if there's error or something)
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const {
    businessName,
    category,
    hasDigitalized,
    productName,
    productDescription,
    price,
    cost,
    platform,
  } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const businessData = {
      businessName,
      category,
      hasDigitalized,
    };

    try {
      const response = await addBusiness(dispatch, businessData);
      if (!response || !response.business_id) return;
      setStatus((prev) => "Successfully added business!");
    } catch (error) {
      console.log(error);
    }
    refresh((prevState) => true);
  };

  useEffect(() => {
    setMessage(businesses.message);

    // return () => setMessage("");
  }, [businesses.message]);

  useEffect(() => {
    if (isSubmitted) {
      nav("/business");
    }

    return () => refresh(false);
  }, [isSubmitted]);

  return (
    <>
      <section className="heading">
        <h1>
          <FaAddressCard /> Business Particulars
        </h1>

        <p>Input Your Business Details</p>
      </section>
      <section className="businessForm">
        <div className="container">
          <main>
            <div className="py-5 text-center">
              <img
                className="d-block mx-auto mb-4"
                src="/images/DigitalIT Logo.png"
                alt=""
                width="152"
                height="38"
              ></img>
              <h2>Business Particulars</h2>
              <p className="lead">
                Please fill in your business particulars below. All data are
                being kept safely and are important for us to generate accurate
                recommendation for your business growth.
              </p>
            </div>

            <div className="row g-5">
              <div>
                <h4 className="mb-3">General Information</h4>
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={onSubmit}
                >
                  <div className="row g-3">
                    <div className="col-12">
                      <label for="businessName" className="form-label">
                        Business Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="businessName"
                        name="businessName"
                        placeholder="My Batik Shop"
                        value={businessName}
                        onChange={onChange}
                      />
                      <div className="invalid-feedback">
                        Please enter a valid business name for future reference.
                      </div>
                    </div>

                    <div className="col-12">
                      <label for="category" className="form-label">
                        Category
                      </label>
                      <select
                        className="form-select"
                        value={formData.category}
                        id="category"
                        name="category"
                        onChange={onChange}
                        required
                      >
                        <option value="">Select below</option>
                        <option value="Fashion and Clothings">
                          Fashion and Clothings
                        </option>
                        <option value="Electronics and Hardwares">
                          Electronics and Hardwares
                        </option>
                        <option value="Food and Groceries">
                          Food and Groceries
                        </option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a valid category.
                      </div>
                    </div>

                    <div className="col-12">
                      <label for="hasDigitalized" className="form-label">
                        Digitalization Progress
                      </label>
                      <select
                        className="form-select"
                        id="hasDigitalized"
                        name="hasDigitalized"
                        onChange={onChange}
                        required
                      >
                        <option value={null}>
                          Have you digitalized your business?
                        </option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                      <div className="invalid-feedback">
                        Please provide a valid answer.
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />
                  <h4 className="mb-3">Product Information</h4>
                  <div className="row g-3">
                    <div className="col-12">
                      <label for="productName" className="form-label">
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="productName"
                        name="productName"
                        placeholder="Batik Dress"
                        value={productName}
                        onChange={onChange}
                      />
                      <div className="invalid-feedback">
                        Please enter a valid product name for future reference.
                      </div>
                    </div>

                    <div className="col-12">
                      <label for="productDescription" className="form-label">
                        Product Description
                        <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="productDescription"
                        name="productDescription"
                        placeholder="Midi dress for women. Made in Indonesia."
                        value={productDescription}
                        onChange={onChange}
                      />
                      <div className="invalid-feedback">
                        Please enter a valid description for future reference.
                      </div>
                    </div>

                    <div className="col-12">
                      <label for="productPrice" className="form-label">
                        Product Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={price}
                        placeholder="How much do you intend to sell this product?"
                        onChange={onChange}
                      />
                      <div className="invalid-feedback">
                        Please enter a valid price for future reference.
                      </div>
                    </div>

                    <div className="col-12">
                      <label for="productCost" className="form-label">
                        Product Cost
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="cost"
                        name="cost"
                        value={cost}
                        placeholder="How much does it cost you to produce this?"
                        onChange={onChange}
                      />
                      <div className="invalid-feedback">
                        Please enter a valid cost for future reference.
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />

                  <h4 className="mb-3">Store</h4>
                  <div className="row g-3">
                    <div className="col-12">
                      <label for="storeLocation" className="form-label">
                        Store Location
                      </label>
                      <select
                        className="form-select"
                        id="storeLocation"
                        name="storeLocation"
                        onChange={onChange}
                        multiple
                        required
                      >
                        <option value="">
                          Where do you sell your product?
                        </option>
                        <option value="Offline Store">Offline store</option>
                        <option value="Bukalapak">Bukalapak</option>
                        <option value="Tokopedia">Tokopedia</option>
                        <option value="Shopee">Shopee</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a valid location.
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />

                  <button
                    className="w-100 btn btn-primary btn-lg"
                    type="submit"
                  >
                    Save Information
                  </button>
                  {status === "" ? message : status}
                </form>
              </div>
            </div>
          </main>

          <footer className="my-5 pt-5 text-muted text-center text-small">
            <p className="mb-1">&copy; 2022 DigitalIT</p>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#">Privacy</a>
              </li>
              <li className="list-inline-item">
                <a href="#">Terms</a>
              </li>
              <li className="list-inline-item">
                <a href="#">Support</a>
              </li>
            </ul>
          </footer>
        </div>
      </section>
    </>
  );
}
