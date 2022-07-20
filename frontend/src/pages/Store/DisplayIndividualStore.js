import { useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStore } from "../../features/store/storeServices";

export default function DisplayIndividualStore() {
  const { store_id } = useParams();
  const [store, setStore] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const store = await getStore({ store_id });
      setStore(() => store);
    }
    fetchData();

  }, [store_id]);
  

  return (
    <>
      <h1>{store.store_name}</h1>
      <Outlet />
    </>
  );
}