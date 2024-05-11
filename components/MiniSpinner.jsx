"use client";
import { PulseLoader } from "react-spinners";

function MiniSpinner() {
  return (
    <PulseLoader
      color="rgb(59 130 246)"
      loading={true}
      size="2em"
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default MiniSpinner;
