import { FaSignInAlt, FaSignOutAlt, FaUser, FaDashcube } from "react-icons/fa";
import { useContext } from "react";
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
        <Link to="/landing">Home</Link>
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
    <header className="header">
      <div className="logo">
        <Link to="/landing">Home</Link>
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
  );
}

function Header() {
  const { user } = useContext(AuthContext);

  return user.user ? <HeaderLoggedIn /> : <HeaderLoggedOut />;
}

export default Header;
