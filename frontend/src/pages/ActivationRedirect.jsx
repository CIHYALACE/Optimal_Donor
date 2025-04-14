import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActivationRedirect = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the proper activation route
    navigate(`/activate/${uid}/${token}`, { replace: true });
  }, [uid, token, navigate]);

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Redirecting...</span>
      </div>
    </div>
  );
};

export default ActivationRedirect;
