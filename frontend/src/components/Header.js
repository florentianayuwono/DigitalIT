import { FaSignInAlt, FaSignOutAlt, FaUser, FaDashcube } from "react-icons/fa";
import { Fragment, useContext } from "react";
import { AuthContext } from "../features/auth/authContext";
import { logoutUser } from "../features/auth/authServices";
import { Link } from "react-router-dom";

function HeaderLoggedIn() {
  const { dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    await logoutUser(dispatch);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Home</Link>
      </div>
      <ul>
        <li>
          <Link to="/dashboard">
            <FaDashcube /> Dashboard
          </Link>
        </li>
        <li>
          <button className="btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </header>
  );
}

function HeaderLoggedOut() {
  return (
    <Fragment>
      <header className="header">
        <div className="logo">
          <Link to="/">Home</Link>
        </div>
        <ul>
          <li>
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link to="/register">
              <FaUser /> Register
            </Link>
          </li>
        </ul>
      </header>

      {/* Landing Display */}
      <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src="/images/Start road.png"
              class="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="1625"
              height="1499"
              loading="lazy"
            />
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3">
              Upgrade your business, level-up your strategy!
            </h1>
            <p class="lead">
              See what works best for your business, track your growth journey
              and let's empower together.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <a
                class="btn btn-primary btn-lg px-4 me-md-2"
                href="login"
                role="button"
                aria-pressed="true"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    
    </Fragment>
  );
}

function Header() {
  const { user } = useContext(AuthContext);

  return user.user ? <HeaderLoggedIn /> : <HeaderLoggedOut />;
}

export default Header;
