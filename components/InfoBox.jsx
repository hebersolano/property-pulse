import { link } from "fs";
import Link from "next/link";

function InfoBox({
  heading,
  bgColor = "bg-gray-100",
  textColor = "text-gray-800",
  btnInfo,
  children,
}) {
  btnInfo = {
    link: "#",
    text: "example",
    bgColor: "bg-black",
    bgHover: "bg-gray-700",
    ...btnInfo,
  };

  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className="mt-2 mb-4">{children}</p>
      <Link
        href={btnInfo.link}
        className={`inline-block ${btnInfo.bgColor} text-white rounded-lg px-4 py-2 hover:${btnInfo.bgHover}`}
      >
        {btnInfo.text}
      </Link>
    </div>
  );
}

export default InfoBox;
