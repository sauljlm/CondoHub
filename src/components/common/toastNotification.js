import React, { useState, useEffect, useContext } from "react";
import { toastContext } from "../../appContext.js";
import { BsFillCheckCircleFill, BsFillXCircleFill, BsFillExclamationCircleFill } from "react-icons/bs";

const ToastNotification = () => {
  const context = useContext(toastContext);
  const [showToast, setShowToast] = useState(false);
  const [text, setText] = useState("CondoHub");

  useEffect(() => {
    if (context.data.message !== "CondoHub") {
      setText(context.data.message);
      setShowToast(true);
    }
  }, [context]);

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
        setText("CondoHub");
      }, context.data.timeOut);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showToast]);

  return (
    <div>
      {showToast && (
        <div
          id="toast-success"
          //   className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center w-full max-w-md p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-darkBlueTheme"
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center w-full max-w-md p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-zinc-800"
          role="alert"
        >
          <div
            className={`inline-flex items-center justify-center flex-shrink-0 text-2xl 
          ${context.data.type === "error" ? "text-red-500" : ""}
          ${context.data.type === "alert" ? "text-orange-500" : ""}
          ${context.data.type === "success" ? "text-lightGreenTheme" : ""}
          `}
            {...(context.data.type === "error" ? { children: <BsFillXCircleFill /> } : {})}
            {...(context.data.type === "alert" ? { children: <BsFillExclamationCircleFill /> } : {})}
            {...(context.data.type === "success" ? { children: <BsFillCheckCircleFill /> } : {})}
          ></div>
          <div className="ml-3 text-sm font-normal text-white">{text}</div>
          {/* <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-100 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button> */}
        </div>
      )}
      ;
    </div>
  );
};

export default ToastNotification;
