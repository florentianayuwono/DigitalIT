export default function Landing() {
  return (
    <div class="container col-xxl-8">
      <div class="row flex-lg-row-reverse align-items-center g-5">
        <div class="col-10 col-sm-8 col-lg-6">
          <img
            src="/images/Start road.png"
            class="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            width="1625"
            height="1499"
            loading="lazy"
          />
        </div>
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold lh-1 mb-3">
            Upgrade your business, level-up your strategy!
          </h1>
          <p class="lead">
            See what works best for your business, track your growth journey and
            let's empower together.
          </p>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <a
              class="btn btn-primary btn-lg px-4 me-md-2"
              href="login"
              role="button"
              aria-pressed="true"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
