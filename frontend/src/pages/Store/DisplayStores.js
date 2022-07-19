import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddStoreForm from "../../components/AddStoreForm";
import PopupMessageButton from "../../components/PopupMessageButton";
import { deleteStore, getStore } from "../../features/store/storeServices";

export default function DisplayStores() {
  const [stores, setStores] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const nav = useNavigate();
  const { business_id } = useParams();

  useEffect(() => {
    const fetchStores = async () => {
      const stores = await getStore({ business_id });
      setStores(stores);
    };

    fetchStores();

    return () => {
      setStores([]);
    }
  }, [refresh, business_id]);

  return (
    <div className="row align-items-md-stretch">
      <h1>Stores</h1>
      <ul>
        {stores.map((store) => {
          return (
            <div className="col-md-6" key={store.store_id}>
              <div
                className="h-100 p-5 bg-light border rounded-3"
                key={store.store_id}
              >
                <h3>{store.store_name}</h3>
                <PopupMessageButton
                  action={() => {
                    deleteStore({ store_id: store.store_id });
                    setRefresh((prev) => !prev);
                  }}
                  message="Are you sure to delete this store? This action cannot be undone."
                  title="Delete"
                  executeTitle="Delete"
                />
                <Button colorScheme={"purple"} onClick={() => nav(`${store.store_id}`)}>
                  View details
                </Button>
              </div>
            </div>
          );
        })}
      </ul>
      <AddStoreForm business_id={business_id} refresh={setRefresh} />
    </div>
  );
}
