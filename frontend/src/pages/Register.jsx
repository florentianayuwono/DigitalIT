import { useAuthContext } from "../features/auth/authContext";
import { registerUser } from "../features/auth/authServices";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@chakra-ui/react";

export default function Register() {
  // Set initial state to empty string
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const { user, dispatch } = useAuthContext();
  // Message to be shown (if there's error or something)
  const [message, setMessage] = useState("");
  const nav = useNavigate();

  // If already logged in, then go straight to dashboard
  useEffect(() => {
    if (user.user) {
      nav("/dashboard");
    }
  });

  // Collect data from user
  const { name, email, password, phoneNumber } = formData;

  // Enable user to see live what they type
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Function when user submit the form
  const onSubmit = async (e) => {
    // Prevent browser to be refreshed/reloaded
    e.preventDefault();

    // Wrap the data collected
    const registrationData = {
      fullName: name,
      email,
      password,
      phoneNumber,
    };

    // Authenticate the data collected by calling registerUser from authServices
    try {
      const response = await registerUser(dispatch, registrationData);
      if (!response || !response.user_id) return;
    } catch (error) {
      console.log(error);
    }
  };

  // Set the message to bear message returned by authentication process, then clean up
  useEffect(() => {
    setMessage(user.message);

    return () => setMessage("");
  }, [user.message]);

  return (
    <>
      {/* Registration page display */}
      <section className="heading landing">
        <Stack align="center">
          <Stack direction="row" align="center">
            <h1>
              <FaUser />
            </h1>
            <h1>Register</h1>
          </Stack>

          {message === "" ? <p>Create an account</p> : message}
        </Stack>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="enter your name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="enter your password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="enter your phone number"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
