import React from "react";
import AuthForm from "@/components/AuthForm";

const index = () => {
  return (
    <div>
      <AuthForm authOperation="signup" />
      <AuthForm authOperation="login" />
    </div>
  );
};

export default index;
