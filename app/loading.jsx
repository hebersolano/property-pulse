"use client";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

function LoadingPage() {
  return (
    <div className="bg-blue-50 flex flex-1 justify-center items-center">
      <ClipLoader
        color="rgb(59 130 246)"
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default LoadingPage;
