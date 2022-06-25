import { AuthContext } from "../../features/auth/authContext";
import { FaUser } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";

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
  const { user } = useContext(AuthContext);
  // Message to be shown (if there's error or something)
  const [message, setMessage] = useState("");

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
      productName,
      productDescription,
      price,
      cost,
      platform,
    };

    // try {
    //   const response = await InputBusinessParticular(dispatch, businessData);
    //   if (!response || !response.user_id) return;
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    setMessage(user.message);

    return () => setMessage("");
  }, [user.message]);

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Business Particulars
        </h1>

        {message === "" ? <p>Input Your Business Details</p> : message}
      </section>
      <section className="businessForm">
        <div class="container">
          <main>
            <div class="py-5 text-center">
              <img
                class="d-block mx-auto mb-4"
                src="/images/DigitalIT Logo.png"
                alt=""
                width="72"
                height="57"
              ></img>
              <h2>Business Particulars</h2>
              <p class="lead">
                Please fill in your business particulars below. All data are
                being kept safely and are important for us to generate accurate
                recommendation for your business growth.
              </p>
            </div>

            <div class="row g-5">
              <div>
                <h4 class="mb-3">General Information</h4>
                <form class="needs-validation" novalidate onSubmit={onSubmit}>
                  <div class="row g-3">
                    <div class="col-12">
                      <label for="businessName" class="form-label">
                        Business Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="businessName"
                        name="businessName"
                        placeholder="My Batik Shop"
                        value={businessName}
                        onChange={onChange}
                      />
                      <div class="invalid-feedback">
                        Please enter a valid business name for future reference.
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="category" class="form-label">
                        Category
                      </label>
                      <select class="form-select" value={formData.category} id="category" name="category" onChange={onChange} required>
                        <option value="">Select below</option>
                        <option
                          value="Fashion and Clothings"
                        >
                          Fashion and Clothings
                        </option>
                        <option
                          value="Electronics and Hardwares"
                        >
                          Electronics and Hardwares
                        </option>
                        <option
                          value="Food and Groceries"
                        >
                          Food and Groceries
                        </option>
                      </select>
                      <div class="invalid-feedback">
                        Please select a valid category.
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="hasDigitalized" class="form-label">
                        Digitalization Progress
                      </label>
                      <select class="form-select" id="hasDigitalized" name="hasDigitalized" onChange={onChange} required>
                        <option value={null}>
                          Have you digitalized your business?
                        </option>
                        <option value={true}>
                          Yes
                        </option>
                        <option value={false}>
                          No
                        </option>
                      </select>
                      <div class="invalid-feedback">
                        Please provide a valid answer.
                      </div>
                    </div>
                  </div>

                  <hr class="my-4" />
                  <h4 class="mb-3">Product Information</h4>
                  <div class="row g-3">
                    <div class="col-12">
                      <label for="productName" class="form-label">
                        Product Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="productName"
                        name="productName"
                        placeholder="Batik Dress"
                        value={productName}
                        onChange={onChange}
                      />
                      <div class="invalid-feedback">
                        Please enter a valid product name for future reference.
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="productDescription" class="form-label">
                        Product Description
                        <span class="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="productDescription"
                        name="productDescription"
                        placeholder="Midi dress for women. Made in Indonesia."
                        value={productDescription}
                        onChange={onChange}
                      />
                      <div class="invalid-feedback">
                        Please enter a valid description for future reference.
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="productPrice" class="form-label">
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
                      <div class="invalid-feedback">
                        Please enter a valid price for future reference.
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="productCost" class="form-label">
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
                      <div class="invalid-feedback">
                        Please enter a valid cost for future reference.
                      </div>
                    </div>
                  </div>
                  <hr class="my-4" />

                  <h4 class="mb-3">Store</h4>
                  <div class="row g-3">
                    <div class="col-12">
                      <label for="storeLocation" class="form-label">
                        Store Location
                      </label>
                      <select
                        class="form-select"
                        id="storeLocation"
                        name="storeLocation"
                        onChange={onChange}
                        multiple
                        required
                      >
                        <option value="">
                          Where do you sell your product?
                        </option>
                        <option
                          value="Offline Store"
                        >
                          Offline store
                        </option>
                        <option
                          value="Bukalapak"
                        >
                          Bukalapak
                        </option>
                        <option
                          value="Tokopedia"
                        >
                          Tokopedia
                        </option>
                        <option
                          value="Shopee"
                        >
                          Shopee
                        </option>
                      </select>
                      <div class="invalid-feedback">
                        Please select a valid location.
                      </div>
                    </div>
                  </div>
                  <hr class="my-4" />

                  <button class="w-100 btn btn-primary btn-lg" type="submit">
                    Save Information
                  </button>
                </form>
              </div>
            </div>
          </main>

          <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">&copy; 2022 DigitalIT</p>
            <ul class="list-inline">
              <li class="list-inline-item">
                <a href="#">Privacy</a>
              </li>
              <li class="list-inline-item">
                <a href="#">Terms</a>
              </li>
              <li class="list-inline-item">
                <a href="#">Support</a>
              </li>
            </ul>
          </footer>
        </div>
      </section>
    </>
  );
}
