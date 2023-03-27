import { useEffect, useState } from "react";

const NewsBanner = () => {
  //TODO EDU save this into local storage or something for persistence
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hideNewsBanner = localStorage.getItem("newsBanner");
    // add logic here to fetch latest version and content
    hideNewsBanner ? setVisible(false) : setVisible(true);
  });

  const CLOSE = () => {
    localStorage.setItem("newsBanner", "hide");
    setVisible((prev) => !prev);
  };

  return (
    <div className="bg-white-100">
      {visible == true ? (
        <div className="max-w-screen-xl mx-auto px-4 py-1 flex items-start justify-between text-white md:px-8">
          <div className="flex gap-x-4">
            <div className="w-6 h-6 flex-none rounded-lg bg-teal-800 flex items-center justify-center self-center">
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
                />
              </svg>
            </div>
            <p className="py-2 font-medium text-black">
              Sitio en construcción{" "}
              {/* <a href="javascript:(0)" className="font-semibold underline duration-150 hover:text-teal-100">
              all features
            </a> */}
            </p>
          </div>
          <button className="p-2 rounded-lg duration-150 hover:bg-greenTheme ring-offset-2 " onClick={CLOSE}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" className="w-6 h-6">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default NewsBanner;
