import Navbar from "@/components/Navbar";
import React from "react";

const LayoutMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default LayoutMain;
