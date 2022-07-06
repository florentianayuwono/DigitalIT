import Button from "react-bootstrap/Button";

// component that takes in a busines object and outputs a box with the business name.
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
