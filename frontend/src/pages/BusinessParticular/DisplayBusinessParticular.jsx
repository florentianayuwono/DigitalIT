import { useEffect, useState } from "react";
import { getBusinesses } from "../../features/business/businessServices";
import { useBusinessContext } from "../../features/business/businessContext";
import { BusinessItem } from "../../components/BusinessItem";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../features/auth/authContext";
import Button from "react-bootstrap/esm/Button";

export default function DisplayBusinessParticular() {
  const { businesses, dispatch } = useBusinessContext();
  const [businessesState, setBusinesses] = useState(businesses.businesses);
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
      <div className="d-grid gap-5">
        {businessesState.map((business) => (
          <BusinessItem business={business} key={business.business_id} />
        ))}
        <Button variant="secondary" size="lg" onClick={onClick}>
          Add New
        </Button>
      </div>
      <footer className="pt-3 mt-4 text-muted border-top">&copy; 2022</footer>
    </>
  );
}
