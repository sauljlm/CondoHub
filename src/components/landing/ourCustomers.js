import { useContext } from "react";
import { appContext } from "../../appContext.js";

const OurCustomers = () => {
  const context = useContext(appContext);

  return (
    <section ref={context.ourCustomersRef} className="py-14" id="ourCustomers">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 md:flex-col">
        <div className="max-w-3xl mx-auto md:flex">
          <figure className="p-10">
            <blockquote>
              <p className="text-gray-800 text-xl text-center font-semibold sm:text-2xl">
                "Esta app simplifica la administración del condominio. Puedo ver todo en un solo lugar y comunicarme
                mejor con mi administrador. Me encanta tenerla en mi iPhone."
              </p>
            </blockquote>
            <div className="flex justify-center items-center gap-x-4 mt-6">
              <img src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg" className="w-16 h-16 rounded-full" />
              <div>
                <span className="block text-gray-800 font-semibold">Pablo Gonzalez</span>
                <span className="block text-gray-600 text-sm mt-0.5">Vecino</span>
              </div>
            </div>
          </figure>
          <figure className="p-10">
            <blockquote>
              <p className="text-gray-800 text-xl text-center font-semibold sm:text-2xl">
                "Esta app mejora la eficiencia de mi trabajo. Manejo todo digitalmente y me comunico mejor con los
                propietarios. La recomiendo"
              </p>
            </blockquote>
            <div className="flex justify-center items-center gap-x-4 mt-6">
              <img src="https://api.uifaces.co/our-content/donated/2Stzj6r-.jpg" className="w-16 h-16 rounded-full" />
              <div>
                <span className="block text-gray-800 font-semibold">Martin Borrijo</span>
                <span className="block text-gray-600 text-sm mt-0.5">Administrador</span>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default OurCustomers;
