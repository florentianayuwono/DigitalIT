import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useAuthContext } from "../features/auth/authContext";
import { loginUser } from "../features/auth/authServices";
import { Center, Container, Stack } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function Login(props) {
  // Set initial state to empty string
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const { user, dispatch } = useAuthContext();
  const [message, setMessage] = useState("");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const nav = useNavigate();

  // If already logged in, then go straight to dashboard
  useEffect(() => {
    if (user.user) {
      nav("/dashboard");
    }
  });

  // Collect data from user
  const { email, password } = formData;

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
    const loginData = {
      email,
      password,
    };

    // Authenticate the data collected by calling loginUser from authServices
    try {
      const response = await loginUser(dispatch, loginData);
      if (!response || !response.user_id) return;
      nav(from, { replace: true });
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
    <Stack direction="column" align="center" >
      {/* Login page display */}
      <Center position="relative">
        <Stack>
          <Stack direction="row" align="center">
            <ArrowForwardIcon w={12} h={12} />
            <h1>Login</h1>
          </Stack>

          {message === "" ? <h4>Start digitalizing</h4> : <h4>{message}</h4>}
        </Stack>
      </Center>

      <section className="form">
        <form onSubmit={onSubmit}>
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
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </Stack>
  );
}
