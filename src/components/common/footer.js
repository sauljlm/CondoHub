//Floatui component https://www.floatui.com/
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import studioLogo from "../../assets/logos/condoHubLogoOnlyTransparent.png";
import { FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const [pathname, setPathname] = useState(window.location.pathname);
  useEffect(() => {
    setPathname(window.location.pathname);
  });
  let navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  return (
    <footer
      className={`text-gray-500 bg-stone-200 px-4 py-2 max-w-screen mx-auto mt-4" ${
        pathname.includes("app") ? "hidden" : "block"
      }`}
    >
      <div className="max-w-lg mx-auto text-center">
        <button
          onClick={() => {
            handleClick("/devTeam");
          }}
        >
          <img src={studioLogo} className="w-16 mx-auto" />
        </button>
        <p className="leading-relaxed mt-2 text-[15px] italic ">Disfruta tu condo digital</p>
      </div>
      {/* <ul className="items-center justify-center mt-8 flex space-x-4 space-y-0">
        {footerNavs.map((item, idx) => (
          <li className=" hover:text-lime-600">
            <a key={idx} href={item.href}>
              {item.name}
            </a>
          </li>
        ))}
      </ul> */}
      <div className="mt-1 items-center justify-between flex">
        <div className="place-self-center"> © 2023 Avengers Studios, Todos los derechos reservados </div>
        <div className="mt-0">
          <ul className="flex items-center space-x-4">
            {/* //Twitter icon */}
            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <a>
                <FaTwitter className="h-full w-8 mr-3 text-blue-400 hover:cursor-pointer" />
              </a>
            </li>
            <button
              onClick={() => {
                window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
              }}
              className="flex place-self-center"
            >
              <FaYoutube className="h-full w-8 mr-3 text-red-500 hover:cursor-pointer" />
            </button>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
