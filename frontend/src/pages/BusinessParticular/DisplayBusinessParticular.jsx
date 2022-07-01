import { useEffect, useState } from "react";
import { getBusinesses } from "../../features/business/businessServices";
import { useBusinessContext } from "../../features/business/businessContext";
import { BusinessItem } from "../../components/BusinessItem";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../features/auth/authContext";
import Button from "react-bootstrap/esm/Button";
import { DisplayIndividualBusiness } from "./DisplayIndividualBusiness";

export default function DisplayBusinessParticular() {
  const { businesses, dispatch } = useBusinessContext();
  const [businessesState, setBusinesses] = useState(businesses.businesses);
  const [selectedBusiness, setSelectedBusiness] = useState("No selected business");
  const { user } = useAuthContext();

  const nav = useNavigate();

  useEffect(() => {
    if (!user.user) {
      nav("/login");
    }
  });

  const onClick = () => {
    nav("/business/add");
  };

  const getData = async (e) => {
    try {
      const response = await getBusinesses(dispatch);
      setBusinesses((prev) => response);
    } catch (err) {
      console.error(err.message);
      return;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="row align-items-md-stretch">
        <div className={selectedBusiness !== "No selected business" ? "col-md-4" : "container"}>
          <div
            className="container"
            style={{
              borderRight: "10px solid #ebebeb",
              paddingBottom: "solid 5px",
            }}
          >
            <div
              className="container"
              style={{
                marginBottom: "30px",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              Your {businessesState.length > 1 ? "Businesses" : "Business"}
            </div>
            <div className="d-grid gap-5">
              {businessesState.map((business) => (
                <BusinessItem
                  business={business}
                  key={business.business_id}
                  onClick={() => setSelectedBusiness(business)}
                />
              ))}
              <Button variant="secondary" size="lg" onClick={onClick}>
                Add New
              </Button>
            </div>
          </div>
        </div>

        <div className={selectedBusiness !== "No selected business" ? "col-md-8" : "container"}>
          <div className="container">
            <DisplayIndividualBusiness business={selectedBusiness} />
          </div>
        </div>
      </div>
      <footer className="pt-3 mt-4 text-muted border-top">&copy; 2022</footer>
    </>
  );
}
