import { useAuthContext } from "../features/auth/authContext";

export default function Landing() {
  const { user } = useAuthContext();
  return (
    <div className="container col-xxl-8 landing">
      <div className="row flex-lg-row-reverse align-items-center g-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src="/images/Start road.png"
            className="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            width="1625"
            height="1499"
            loading="lazy"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-1 mb-3 text-start">
            Upgrade your business, level-up your strategy!
          </h1>
          <p className="mb-3 lead text-start">
            See what works best for your business, track your growth journey and
            let's empower together.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <a
              className="btn btn-primary btn-lg px-4 me-md-2"
              href={user.user ? "/dashboard" : "/login"}
              role="button"
              aria-pressed="true"
            >
              {user.user ? "Dashboard" : "Login"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
