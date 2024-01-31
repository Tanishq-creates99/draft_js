import React from "react";
import Button from "./Button";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

const Title = ({ handleSave }) => {
  return (
    <div className="w-[75%] flex justify-between p-3 m-5">
      <div className="text-3xl font-mono flex justify-center items-center">Demo Editor by Tanishq</div>
      <div className="">
        <Button handleSave={handleSave} />

        <div className=" border-2 mt-2 animate-pulse">
          <Popup
            trigger={
              <button>
                {" "}
                <FontAwesomeIcon icon={faInfo} />
              </button>
            }
            position="left center"
          >
            <div>
            <ul>~ - ordered</ul><hr></hr>
            <ul> ` - unordered</ul><hr></hr>
            <ul>&  - Italic</ul><hr></hr>
            <ul>*  - Bold</ul><hr></hr>
            <ul>_  - Underline</ul><hr></hr>
            <ul>+  - Red-highlight</ul><hr></hr>
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default Title;
