import { useParams, Outlet, useOutletContext } from "react-router-dom";

export default function DisplayIndividualStore() {
  const { store_id } = useParams(); 

  return (
    <>
      <Outlet />
    </>
  );
}