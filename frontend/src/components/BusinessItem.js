import Button from "react-bootstrap/Button";

// Takes in business object and output a card with the business details in it
export const BusinessItem = (props) => {
  return (
    <>
      <div class="col-sm-6 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{props.business.business_name}</h5>
            <p class="card-text">Category: {props.business.categories}</p>
            <p class="card-text">
              {props.business.has_digitalized
                ? "Digitalized"
                : "Not Digitalized"}
            </p>
            <Button class="btn btn-primary" onClick={props.onClick}>
              View details
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
