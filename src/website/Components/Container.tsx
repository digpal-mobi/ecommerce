import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const CONTAINER_CLASS =
  "mx-auto w-full max-w-[1920px] px-5 mobile:px-6 tablet:px-8 tablet-lg:px-10 laptop:px-12 laptop-lg:px-16 desktop:px-[100px] desktop-lg:px-[100px]";

const Container = ({ children, className = "" }: Props) => {
  return <div className={`${CONTAINER_CLASS} ${className}`}>{children}</div>;
};

export default Container;
