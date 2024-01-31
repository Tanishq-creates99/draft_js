import React from "react";

const Button = ({ handleSave }) => {
  return (
    <div className="border-2 px-2 hover:bg-teal-300 hover:border-teal-400 hover:rounded-lg" >
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Button;
