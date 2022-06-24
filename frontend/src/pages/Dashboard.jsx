import { AuthContext } from "../features/auth/authContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const userValue = useMemo(() => ({ user }), [user]);

  // useEffect(() => {
  //   if (!user.user) {
  //     nav("/login");
  //   }
  // }, [userValue]);

  return (
    <>
      <div>Dashboard</div>
    </>
  );
}
