import { useState } from "react";

const AboutUs = () => {
  const [state, setState] = useState(false);

  return (
    <>
      <section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8 py-10" id="aboutUs">
        <div className="text-center space-y-4">
          <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
            Administración
            <span className="text-greenTheme"> INTELIGENTE </span>
            de condominios
          </h1>
          <p className="text-gray-500 max-w-4xl mx-auto leading-relaxed">
            ¡Bienvenido! Sabemos que encontrar una solución adecuada para residentes y administradores no es sencillo,
            por eso decidimos crear CondoHUB, la mejor y más inteligente aplicación para condominios.
          </p>
        </div>
        <div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
          {/* <a
            href="javascript:void(0)"
            className="px-10 py-3.5 w-full bg-greenTheme text-white text-center rounded-md shadow-md block sm:w-auto"
          >
            Get started
          </a>
          <a
            href="javascript:void(0)"
            className="px-10 py-3.5 w-full text-gray-500 text-center border rounded-md duration-300 hover:text-greenTheme hover:shadow block sm:w-auto"
          >
            Try it out
          </a> */}
        </div>
      </section>
    </>
  );
};

export default AboutUs;
