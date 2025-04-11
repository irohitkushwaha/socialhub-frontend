import React from "react";
import FormTitle from "./FormTitle";

const FormTitleExample = () => {
  return (
    <div className="flex flex-col gap-8 p-4">
      {/* Default usage */}
      <FormTitle className="text-center">Log in with Google</FormTitle>
    </div>
  );
};

export default FormTitleExample;
