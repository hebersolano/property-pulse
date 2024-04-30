import PropTypes from "prop-types";
import Link from "next/link";
import { clsx } from "clsx/lite";
import { usePathname } from "next/navigation";

function NavLink({ href, className, linkActive, children, ...props }) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={clsx(
        className,
        "text-gray-300 hover:bg-gray-700 hover:text-white ",
        "block rounded-md px-3 py-2 text-base font-medium",
        isActive && "bg-black" + linkActive
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

NavLink.PropTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  linkActive: PropTypes.string,
};

NavLink.defaultProps = {
  className: "",
  linkActive: "",
};

export default NavLink;
