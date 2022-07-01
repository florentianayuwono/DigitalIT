// This also is just a sketch to test the getBusinesses function in the businessServices.js file
import { getBusinesses } from "../features/business/businessServices";
import { useBusinessContext } from "../features/business/businessContext";

// Use the business context to get the businesses
function GetBusinessesButton() {
  const {dispatch} = useBusinessContext();

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await getBusinesses(dispatch);

      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <button className="btn btn-success">Get Businesses</button>
      </form>
      <div>
        <h2>{"Hello"}</h2>
      </div>
    </>
  );
}

export default GetBusinessesButton;
