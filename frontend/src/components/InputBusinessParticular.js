import React, { Fragment, useState } from "react";

const InputBusinessParticular = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { description };
      const response = await fetch("/api/business/add", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      //setTodosChange(true);
      setDescription("");
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <div class="container">
        <main>
          <div class="py-5 text-center">
            <img
              class="d-block mx-auto mb-4"
              src="/docs/5.2/assets/brand/bootstrap-logo.svg"
              alt=""
              width="72"
              height="57"
            ></img>
            <h2>Business Particulars</h2>
            <p class="lead">
              Please fill in your business particulars below. All data are being
              kept safely and are important for us to generate accurate
              recommendation for your business growth.
            </p>
          </div>

          <div class="row g-5">
            <div>
              <h4 class="mb-3">General Information</h4>
              <form class="needs-validation" novalidate>
                <div class="row g-3">
                  <div class="col-12">
                    <label for="businessName" class="form-label">
                      Business Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="businessName"
                      placeholder="My Batik Shop"
                    />
                    <div class="invalid-feedback">
                      Please enter a valid business name for future reference.
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="categories" class="form-label">
                      Categories
                    </label>
                    <select class="form-select" id="categories" required>
                      <option value="">Select below</option>
                      <option>Fashion and Clothings</option>
                      <option>Electronics and Hardwares</option>
                      <option>Food and Groceries</option>
                    </select>
                    <div class="invalid-feedback">
                      Please select a valid category.
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="hasDigitalized" class="form-label">
                      Digitalization Progress
                    </label>
                    <select class="form-select" id="hasDigitalized" required>
                      <option value="">
                        Have you digitalized your business?
                      </option>
                      <option>Yes</option>
                      <option>No</option>
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
                      placeholder="Batik Dress"
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
                      placeholder="Midi dress for women. Made in Indonesia."
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
                      class="form-control"
                      id="productPrice"
                      placeholder="How much do you intend to sell this product?"
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
                      class="form-control"
                      id="productCost"
                      placeholder="How much does it cost to produce this product?"
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
                      multiple
                      required
                    >
                      <option value="">Where do you sell your product?</option>
                      <option>Offline store</option>
                      <option>Bukalapak</option>
                      <option>Tokopedia</option>
                      <option>Shopee</option>
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
          <p class="mb-1">&copy; 2017–2022 Company Name</p>
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
    </Fragment>
  );
};

export default InputBusinessParticular;
