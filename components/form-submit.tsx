"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const FormSubmit = () => {
  const status = useFormStatus();

  if (status.pending) {
    return <div>Creating a post...</div>;
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
};

export default FormSubmit;
