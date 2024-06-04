import { cloneElement } from "react";
import { twJoin } from "tailwind-merge";

function FormRow({ label, labelStyle, errors, rowStyle = "mb-2", required, children }) {
  let error = errors?.[children.props.id];
  const className = twJoin(
    children.props.className,
    "border rounded w-full py-2 px-3",
    error && "border-red-600 border-2 focus:border-red-600 focus:outline-none "
  );

  const placeholder = `${children.props.placeholder}${required ? "*" : ""}`;

  return (
    <div className={rowStyle}>
      {label && (
        <label
          htmlFor={children.props?.id}
          className={twJoin(labelStyle, "block text-gray-700 font-bold mb-2")}
        >
          {label}
          {required && <span className="text-gray-400">*</span>}
        </label>
      )}
      {cloneElement(children, { className, placeholder })}
      {error && <span className="text-red-600 text-sm ml-1">{error?.message}</span>}
    </div>
  );
}

export default FormRow;
