import { useEffect, useState } from "react";
import { addStore, getStore } from "../../features/store/storeServices";

export default function DisplayStores({ business_id }) {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async (business_id) => {
      const stores = await getStore({ business_id });
      setStores(stores);
    };

    fetchStores(business_id);
  }, [business_id]);

  return (
    <div>
      <h1>Stores</h1>
      <ul>
        {stores.map((store) => {
          return (
            <li key={store.store_id}>
              <h2>{store.store_name}</h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
