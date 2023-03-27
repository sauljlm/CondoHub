import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Dev = (props) => {
  return (
    <div className="mb-20">
      <div className="grid place-items-center">
        <img src={props.developer.photo} className="h-60 rounded-full justify-self-center mb-5"></img>
      </div>
      <div className="text-center text-xl text-gray-800">
        <div className="font-semibold text-2xl">{props.developer.name}</div>
        <div>{props.developer.position1}</div>
        <div>{props.developer.position2}</div>
        <div className="mt-10 text-lg px-10 ">{props.developer.description}</div>
        <div>
          <a
            href={"https://" + props.developer.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-800 hover:font-semibold text-blue-500"
          >
            LinkedIn
          </a>
        </div>
        <div>
          <a
            href={"https://" + props.developer.portafolio}
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-800 hover:font-semibold text-blue-500"
          >
            {props.developer.portafolio}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dev;
