import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const CONTAINER_CLASS =
  "mx-auto w-full max-w-[1920px] px-[16px] tablet:px-[50px] laptop:px-12 laptop-lg:px-[80px] desktop:px-[100px] desktop-lg:px-[100px]";

const Container = ({ children, className = "" }: Props) => {
  return (
    <div
      className={`${CONTAINER_CLASS} py-[40px] laptop:py-[80px] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
