import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const CONTAINER_CLASS =
  "mx-auto w-full max-w-[1920px] px-[20px] tablet-lg:px-[30px] laptop:px-[80px] desktop:px-[100px]";

export const  Container = ({ children, className = "" }: Readonly<Props>) => {
  return (
    <div className={`${CONTAINER_CLASS} ${className}`.trim()}>{children}</div>
  );
};

export const MainContainer = ({
  children,
  className = "",
}: Readonly<Props>) => {
  return <div className={`max-w-full ${className}`.trim()}>{children}</div>;
};

export default Container;
