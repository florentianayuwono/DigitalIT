export default function Landing() {
  return (
    <div className="container col-xxl-8">
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
          <h1 className="display-5 fw-bold lh-1 mb-3">
            Upgrade your business, level-up your strategy!
          </h1>
          <p className="lead">
            See what works best for your business, track your growth journey and
            let's empower together.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <a
              className="btn btn-primary btn-lg px-4 me-md-2"
              href="login"
              role="button"
              aria-pressed="true"
            >
              Sign In
            </a>
          </div>
        </div>
        <footer className="pt-3 mt-4 text-muted border-top">&copy; 2022</footer>
      </div>
    </div>
  );
}
