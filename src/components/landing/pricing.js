import { useContext } from "react";
import { appContext, toastContext } from "../../appContext.js";

const Pricing = () => {
  const context = useContext(appContext);
  const toast = useContext(toastContext);
  const plans = [
    {
      name: "GRATIS",
      price: 0,
      features: ["Todas las funciones del plan BASICO", "Gratis el primer mes"],
    },
    {
      name: "Basico",
      price: 1,
      features: ["Avisos y noticias", "Control de acceso", "Reserva de amenidades"],
    },
    {
      name: "Premium",
      price: 2,
      features: [
        "Avisos y noticias",
        "Control de acceso",
        "Reserva de amenidades",
        "Manejo de finanzas",
        "Votación de asambleas virtual",
      ],
    },
  ];

  const handleClick = () => {
    toast.set({
      message:
        "¡Gracias por tu interés! CondoHub aun está en construcción. Regístrate para recibir más información y actualizaciones.",
      type: "success",
      timeOut: 5500,
    });
  };

  return (
    <section ref={context.pricingRef} className="py-14" id="pricing">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="relative max-w-xl mx-auto sm:text-center">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">Un precio para todos</h3>
          <div className="mt-3 max-w-xl">
            <p>Creemos que todos merecen vivir en un condominio conectado y tecnológico.</p>
          </div>
        </div>
        <div className="mt-16 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
          {plans.map((item, idx) => (
            <div key={idx} className="relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2">
              <div>
                <span className="text-greenTheme font-medium">{item.name}</span>
                <div className="mt-4 text-gray-800 text-3xl font-semibold">
                  ${item.price} <span className="text-xl text-gray-600 font-normal"> + iva/ filialD al mes</span>
                </div>
              </div>
              <ul className="py-8 space-y-3">
                {item.features.map((featureItem, idx) => (
                  <li key={idx} className="flex items-center gap-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-greenTheme"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {featureItem}
                  </li>
                ))}
              </ul>
              <div className="flex-1 flex items-end">
                <button
                  className="px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-greenTheme hover:bg-indigo-500 active:bg-indigo-700"
                  onClick={() => {
                    handleClick();
                  }}
                >
                  Lo quiero
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Pricing;
