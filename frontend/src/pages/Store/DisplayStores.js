import { useEffect, useState } from "react";
import AddStoreForm from "../../components/AddStoreForm";
import PopupMessageButton from "../../components/PopupMessageButton";
import { getStore } from "../../features/store/storeServices";

export default function DisplayStores({ business_id }) {
  const [stores, setStores] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchStores = async (business_id) => {
      const stores = await getStore({ business_id });
      setStores(stores);
    };

    fetchStores(business_id);
  }, [business_id, refresh]);

  return (
    <div className="row align-items-md-stretch">
      <h1>Stores</h1>
      <ul>
        {stores.map((store) => {
          return (
            <div className="col-md-6" key={store.store_id}>
              <div className="h-100 p-5 bg-light border rounded-3" key={store.store_id}>
                <h3>{store.store_name}</h3>
              </div>
            </div>
          );
        })}
      </ul>
      <AddStoreForm business_id={business_id} refresh={setRefresh} />
    </div>
  );
}

