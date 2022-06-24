import { useContext, useState } from "react";
import { AuthContext } from "../features/auth/authContext";
import { FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// the form should be submitted to the server and the server should return a success message
// if the form is submitted successfully, the user should be redirected to the business page
// if the form is submitted unsuccessfully, the user should be redirected to the add business page
// the user should be able to see a success message if the form is submitted successfully


// the user should be able to see an error message if the form is submitted unsuccessfully
export default function AddBusiness() {
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    hasDigitalized: false,
  });
  
  const navigate = useNavigate();
  const {businessName, category, hasDigitalized} = formData;

  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   if (!user.user) {
  //     navigate("/login");
  //   }
  // });

  const onSubmit = async (e) => {
    e.preventDefault();
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }


  return (
    <>
      <section className="heading">
        <h1>
          <FaStore /> Add Business
        </h1>

        {message === "" ? <p>Your Business Particulars: </p> : message}
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control"
              id="businessName"
              value={businessName}
              placeholder="Business Name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="category"
              value={category}
              placeholder="Business Category"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <p>Has Digitalized: </p>
            <input
              type="checkbox"
              className="form-control"
              id="hasDigitalized"
              value={hasDigitalized}
              placeholder="Has Digitalized"
              onChange={onChange}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}