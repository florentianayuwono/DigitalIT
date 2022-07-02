import { useEffect } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import Products from "../Product/Products";

export const DisplayIndividualBusiness = (props) => {
  const [selectedBusiness] = useOutletContext();
  const { business_id, business_name, categories, has_digitalized } = selectedBusiness;
  const nav = useNavigate();

  useEffect(() => {
    nav("/business/display/" + business_id);
  }, [nav, selectedBusiness]);

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
