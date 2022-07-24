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
    };
  }, [refresh, business_id]);

  return (
    <div class="container px-4 py-2" id="featured-3">
      <h2 class="pb-2 border-bottom">Stores</h2>
      <div class="row g-4 py-4 row-cols-1 row-cols-lg-3"></div>
      <div className="row">
        {stores.map((store) => {
          return (
            <div className="col-sm-4 mb-4" key={store.store_id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{store.store_name}</h5>

                  <Button
                    className="me-2"
                    colorScheme={"purple"}
                    onClick={() => nav(`${store.store_id}`)}
                  >
                    View details
                  </Button>
                  <PopupMessageButton
                    action={() => {
                      deleteStore({ store_id: store.store_id });
                      setRefresh((prev) => !prev);
                    }}
                    message="Are you sure to delete this store? This action cannot be undone."
                    title="Delete"
                    executeTitle="Delete"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <AddStoreForm business_id={business_id} refresh={setRefresh} />
    </div>
  );
}
