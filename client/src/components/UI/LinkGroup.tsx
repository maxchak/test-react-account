import { FC, PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

interface LinkGroupProps {
  to: string;
  variant: string;
  activeVariant: string;
  className?: string;
}

const LinkGroup: FC<PropsWithChildren<LinkGroupProps>> = ({
  to,
  children,
  variant,
  activeVariant,
  className,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [className, isActive ? "pe-none" : null].filter(Boolean).join(" ")
      }
    >
      {({ isActive }) => (
        <Button variant={isActive ? activeVariant : variant}>{children}</Button>
      )}
    </NavLink>
  );
};

export default LinkGroup;
