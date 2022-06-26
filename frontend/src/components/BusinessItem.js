import Button from "react-bootstrap/Button";

// component that takes in a busines object and outputs a box with the business name.
export const BusinessItem = (props) => {
  return (
    <>
      <Button variant="outline-info" size="lg" active>
        {props.business.business_name}
      </Button>
    </>
  );
};
