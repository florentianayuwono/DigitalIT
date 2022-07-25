import { useEffect, useState } from "react";
import { FaBuilding } from "react-icons/fa";
import { getBusinesses } from "../../features/business/businessServices";
import { useBusinessContext } from "../../features/business/businessContext";
import { BusinessItem } from "../../components/BusinessItem";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { Stack } from "@chakra-ui/react";

export default function DisplayBusinessParticular() {
  const { businesses, dispatch } = useBusinessContext();
  const [businessesState, setBusinesses] = useState(businesses.businesses);
  const nav = useNavigate();

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
        <div className="container">
          <div
            className="container"
            style={{
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
              <section className="heading">
                <Stack direction="row" align="center">
                  <h1>
                    <FaBuilding />
                  </h1>
                  <h1>
                    Your{" "}
                    {businessesState.length > 1 ? "Businesses" : "Business"}
                  </h1>
                </Stack>
              </section>
            </div>
            <div className="row">
              {businessesState.map((business) => (
                <BusinessItem
                  business={business}
                  key={business.business_id}
                  onClick={() => {
                    nav(`/business/${business.business_id}`);
                  }}
                />
              ))}
              <Button variant="secondary" size="lg" onClick={onClick}>
                Add New
              </Button>
            </div>
          </div>
        </div>
      </div>
      <footer className="pt-3 mt-4 text-muted border-top">&copy; 2022</footer>
    </>
  );
}
