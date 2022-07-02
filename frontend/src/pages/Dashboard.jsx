import { useAuthContext} from "../features/auth/authContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuthContext(); 
  const nav = useNavigate();
  const [isSubmitted, refresh] = useState(false);

  useEffect(() => {
    if (!user.user) {
      nav("/login");
    }
  });

  const onClick = () => {
    refresh((prev) => !prev);
  };

  useEffect(() => {
    if (isSubmitted) {
      nav("/business");
    }

    return () => refresh(false);
  }, [isSubmitted]);

  return (
    <>
      {/* Dashboard Display */}
      <main>
        <div className="container py-4">
          <header className="pb-3 mb-4 border-bottom">
            <a
              href="/dashboard"
              className="d-flex align-items-center text-dark text-decoration-none"
            >
              <span className="fs-4">Hi, {user.username}!</span>
            </a>
          </header>

          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">Business Profile</h1>
              <p className="col-md-8 fs-4">
                Documenting your business has never been this easy. Store all of your business, product and store information in one place.
              </p>
              <button className="btn btn-primary btn-lg profile" onClick={onClick}>
                View business data
              </button>
            </div>
          </div>

          <div className="row align-items-md-stretch">
            <div className="col-md-6">
              <div className="h-100 p-5 text-white bg-darkpurple rounded-3">
                <h2 className="text-white">Level up your game</h2>
                <p>
                  At DigitalIT, we are committed to be your personal business
                  consultant and accompany your rocky journey. Find out the next
                  big steps to grow your company here.
                </p>
                <button className="btn btn-outline-light" type="button">
                  Learn more
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="h-100 p-5 bg-lightgreen border rounded-3">
                <h2>Track your performance</h2>
                <p>
                  Your business data is now more powerful than ever. Every piece
                  of information, be it sales or traffic, will give hints on how
                  your business is doing.{" "}
                </p>
                <button className="btn btn-outline-secondary" type="button">
                  Learn more
                </button>
              </div>
            </div>
          </div>

          <footer className="pt-3 mt-4 text-muted border-top landing">
            &copy; DigitalIT 2022
          </footer>
        </div>
      </main>
    </>
  );
}
