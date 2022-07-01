export const DisplayIndividualBusiness = (props) => {
  const { business_name, categories, has_digitalized } = props.business;


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
    </>
  );
};
