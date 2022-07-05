import { useEffect, useState } from "react";
import { getBusinesses } from "../../features/business/businessServices";
import { useBusinessContext } from "../../features/business/businessContext";
import { BusinessItem } from "../../components/BusinessItem";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../features/auth/authContext";
import Button from "react-bootstrap/esm/Button";
import { Outlet } from "react-router-dom";

export default function DisplayBusinessParticular() {
  const { businesses, dispatch } = useBusinessContext();
  const [businessesState, setBusinesses] = useState(businesses.businesses);
  const [selectedBusiness, setSelectedBusiness] = useState(
    "No selected business"
  );
  const { user } = useAuthContext();

  const nav = useNavigate();

  // If is not logged in, then go back to login page
  useEffect(() => {
    if (!user.user) {
      nav("/login");
    }
  });

  // When clicked, navigate to page to add business
  const onClick = () => {
    nav("/business/add");
  };

  // Function to check if the user is authorized and get the business data (by calling getBusinesses)
  const getData = async (e) => {
    try {
      const response = await getBusinesses(dispatch);
      setBusinesses((prev) => response);
    } catch (err) {
      console.error(err.message);
      return;
    }
  };

  // Call the getData function
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="row align-items-md-stretch">
        <div
          className={
            selectedBusiness !== "No selected business"
              ? "col-md-4"
              : "container"
          }
        >
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
                  onClick={() => {
                    nav("/business/display");
                    setSelectedBusiness(business);
                  }}
                />
              ))}
              <Button variant="secondary" size="lg" onClick={onClick}>
                Add New
              </Button>
            </div>
          </div>
        </div>

        {/* right side of the screen (details)*/}
        <div
          className={
            selectedBusiness !== "No selected business"
              ? "col-md-8"
              : "container"
          }
        >
          <div className="container">
            <Outlet context={[selectedBusiness]} />
          </div>
        </div>
      </div>
      <footer className="pt-3 mt-4 text-muted border-top">&copy; 2022</footer>
    </>
  );
}
