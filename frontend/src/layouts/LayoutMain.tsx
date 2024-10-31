import Navbar from "@/components/Navbar";
import React from "react";

const LayoutMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default LayoutMain;
