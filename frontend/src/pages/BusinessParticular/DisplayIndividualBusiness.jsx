import { Outlet, useParams } from "react-router-dom";
import { useBusinessContext } from "../../features/business/businessContext";

const selectBusiness = (business_id, businesses) => {
  const business = businesses.businesses.find(
    (business) => parseInt(business.business_id) === parseInt(business_id)
  );

  return business;
};

export const DisplayIndividualBusiness = () => {
  const { businesses } = useBusinessContext();

  const { business_id } = useParams();
  const { business_name, categories, has_digitalized } = selectBusiness(
    business_id,
    businesses
  );

  return (
    <>
      <div className="heading border-bottom">
        <div className="row">
          <div className="col-md-12">
            <h1 style={has_digitalized ? {} : { color: "rgb(119,119,119)" }}>
              {business_name}
            </h1>
          </div>
          <div className="col-md-12">
            <h3 style={has_digitalized ? {} : { color: "rgb(119,119,119)" }}>
              {categories}
            </h3>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <Outlet />
      </div>
    </>
  );
};
