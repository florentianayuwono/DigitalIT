import Button from "react-bootstrap/Button";

// component that takes in a busines object and outputs a box with the business name.
export const BusinessItem = (props) => {
  return (
    <>
      <div className="col-sm-6 mb-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{props.business.business_name}</h5>
            <p className="card-text">Category: {props.business.business_category}</p>
            <p className="card-text">
              {props.business.has_digitalized
                ? "Digitalized"
                : "Not Digitalized"}
            </p>
            <Button className="btn btn-primary" onClick={props.onClick}>
              View details
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
