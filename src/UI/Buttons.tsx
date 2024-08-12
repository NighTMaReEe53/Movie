import { ReactNode } from "react";

interface IPROPS {
  children: ReactNode;
  onClick?: () => void;
}

const Buttons = ({ children, ...rest }: IPROPS) => {
  return <button className="btn" {...rest}>{children}</button>;
};

export default Buttons;
