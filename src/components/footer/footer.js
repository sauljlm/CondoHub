//Floatui component https://www.floatui.com/
import studioLogo from "../../assets/logos/condoHubLogoOnlyTransparent.png";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  const footerNavs = [
    // {
    //   href: "javascript:void()",
    //   name: "Acerca de",
    // },
    // {
    //   href: "javascript:void()",
    //   name: "Equipo",
    // },
    // {
    //   href: "javascript:void()",
    //   name: "Contacto",
    // },
    // {
    //   href: "javascript:void()",
    //   name: "Team",
    // },
    // {
    //   href: "javascript:void()",
    //   name: "Careers",
    // },
    // {
    //   href: "javascript:void()",
    //   name: "Suport",
    // },
  ];

  return (
    <footer className="text-gray-500 bg-stone-200 px-4 py-5 max-w-screen mx-auto mt-20">
      <div className="max-w-lg mx-auto text-center">
        <a href="/devteam">
          <img src={studioLogo} className="w-16 mx-auto" />
        </a>
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
      <div className="mt-8 items-center justify-between flex">
        <div className="place-self-center"> © 2023 Avengers Studios, Todos los derechos reservados </div>
        <div className="mt-0">
          <ul className="flex items-center space-x-4">
            {/* //Twitter icon */}
            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <a href="javascript:void()">
                <svg class="svg-icon w-6 h-6 text-blue-400" viewBox="0 0 20 20">
                  <path
                    fill="none"
                    d="M18.258,3.266c-0.693,0.405-1.46,0.698-2.277,0.857c-0.653-0.686-1.586-1.115-2.618-1.115c-1.98,0-3.586,1.581-3.586,3.53c0,0.276,0.031,0.545,0.092,0.805C6.888,7.195,4.245,5.79,2.476,3.654C2.167,4.176,1.99,4.781,1.99,5.429c0,1.224,0.633,2.305,1.596,2.938C2.999,8.349,2.445,8.19,1.961,7.925C1.96,7.94,1.96,7.954,1.96,7.97c0,1.71,1.237,3.138,2.877,3.462c-0.301,0.08-0.617,0.123-0.945,0.123c-0.23,0-0.456-0.021-0.674-0.062c0.456,1.402,1.781,2.422,3.35,2.451c-1.228,0.947-2.773,1.512-4.454,1.512c-0.291,0-0.575-0.016-0.855-0.049c1.588,1,3.473,1.586,5.498,1.586c6.598,0,10.205-5.379,10.205-10.045c0-0.153-0.003-0.305-0.01-0.456c0.7-0.499,1.308-1.12,1.789-1.827c-0.644,0.28-1.334,0.469-2.06,0.555C17.422,4.782,17.99,4.091,18.258,3.266"
                  ></path>
                </svg>
              </a>
            </li>
            <li className="flex place-self-center">
              <FaYoutube className="h-full w-8 mr-3 text-red-500 hover:cursor-pointer" />
            </li>
            {/* //Facebook icon */}
            {/* <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <a href="javascript:void()">
                <svg class="svg-icon w-6 h-6 text-blue-700" viewBox="0 0 20 20">
                  <path
                    fill="none"
                    d="M11.344,5.71c0-0.73,0.074-1.122,1.199-1.122h1.502V1.871h-2.404c-2.886,0-3.903,1.36-3.903,3.646v1.765h-1.8V10h1.8v8.128h3.601V10h2.403l0.32-2.718h-2.724L11.344,5.71z"
                  ></path>
                </svg>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .svg-icon path,
        .svg-icon polygon,
        .svg-icon rect {
          fill: currentColor;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
