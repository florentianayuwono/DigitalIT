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
      <h2 class="pb-2 border-bottom">{store.store_name}</h2>
      <div class="row g-4 py-4 row-cols-1 row-cols-lg-3"></div>
      <Outlet />
    </>
  );
}