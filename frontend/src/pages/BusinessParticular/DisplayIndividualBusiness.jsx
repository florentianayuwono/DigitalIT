import { Outlet, useParams } from "react-router-dom";
import { useBusinessContext } from "../../features/business/businessContext";


/*
  Improvement for later here!!

  The way this DisplayIndividualBusiness page works after the modification in which
  we navigate to this page after selecting a business, passing only the business_id
  to this component and not the whole business item which we already have in the previous
  page, is that we have to search for this business item later in the global business state.

  As of right now, the businesses are stored in an array of businesses (specified in the
  businessReducer file) and we need to do linear search for the business item that we
  want to display. This is a very inefficient way of doing this.

  An improvement would be to store the businesses in an object that has the business_id as
  the key and the business item as the value. This would be much more efficient as we can
  index in O(1) time. To achieve this, we can imitate how the products are being stored in 
  the productReducer file. Once that's done, remember to modify the function below so that
  it's suitable for the modified data structure.
*/
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
