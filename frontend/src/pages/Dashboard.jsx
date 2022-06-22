import { AuthContext } from "../features/auth/authContext";
import { logoutUser } from "../features/auth/authServices";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function Dashboard() {
  const { user, dispatch } = useContext(AuthContext);
  const nav = useNavigate();
  const userValue = useMemo(() => ({user}), [user]);

  useEffect(() => {
    if (!user.user) {
      nav("/login");
    }
  }, [userValue]);

  const handleLogout = async () => {
    await logoutUser(dispatch);
  };

  return (
    <>
      <button onClick={handleLogout}>logout</button>
      <div>Dashboard</div>
    </>
  );
}
