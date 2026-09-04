import React, { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

const CONTAINER_CLASS =
  "mx-auto w-full max-w-[1920px] px-[16px] tablet-lg:px-[30px] laptop:px-[80px] desktop:px-[100px]";

export const Container = ({ children, className = "", ...rest }: Props) => {
  return (
    <div className={`${CONTAINER_CLASS} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
};

export const MainContainer = ({ children, className = "", ...rest }: Props) => {
  return (
    <div className={`max-w-full ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
};

export default Container;
