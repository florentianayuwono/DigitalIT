import { useNavigate } from "react-router-dom";

export default function NavigateButton({ link, text }) {
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        navigate(link);
      }}
    >
      {text}
    </button>
  );
}
