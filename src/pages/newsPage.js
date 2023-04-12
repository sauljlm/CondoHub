import React, { useState, useContext, useEffect } from "react";
import { loginContext } from "../appContext.js";
import News from "../components/news/newsComponent";
import DBAccess from "../utils/dbAccess";

const HomePage = () => {
  const newsDB = new DBAccess("news");
  const userContext = useContext(loginContext);
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      let news = await newsDB.getAll(userContext?.aditionalData?.condoName, "news");
      news.sort((a, b) => new Date(b.date.seconds) - new Date(a.date.seconds));
      setNewsItems(news);
    };
    userContext?.aditionalData ? fetchNews() : null;
  }, [userContext]);

  const newsItems2 = [
    {
      id: 1,
      title: "Nuevas reglas en el condominio",
      date: "31 de marzo de 2023",
      imageUrl: "https://source.unsplash.com/random/1280x720",
      content:
        "El consejo de administración ha anunciado nuevas reglas que entrarán en vigor a partir del próximo mes. A partir de entonces, los propietarios de viviendas sólo podrán alquilar sus propiedades a largo plazo, y los inquilinos deberán pasar un proceso de selección riguroso antes de mudarse al condominio. Además, se permitirá fumar sólo en áreas designadas, y se prohibirán los animales de compañía en el área de la piscina. Estas medidas se han tomado en respuesta a las quejas de los residentes, y se espera que mejoren la calidad de vida en el condominio.",
      comments: [
        {
          id: 1,
          author: "Juan Pérez",
          text: "Me parece una excelente decisión.",
        },
        {
          id: 2,
          author: "María Gómez",
          text: "No estoy de acuerdo con estas nuevas reglas, especialmente la prohibición de mascotas en la piscina.",
        },
      ],
    },
    {
      id: 2,
      title: "Nuevas normas de seguridad en el edificio",
      date: "3 de abril de 2023",
      imageUrl: "https://source.unsplash.com/random/900x600",
      content:
        "El comité de seguridad del edificio ha anunciado nuevas normas de seguridad que entrarán en vigor a partir del 10 de abril. Estas normas incluyen la instalación de cámaras de seguridad en todas las áreas comunes, así como la implementación de un nuevo sistema de acceso al edificio que requerirá que todos los residentes utilicen sus tarjetas de acceso para entrar y salir del edificio. El comité ha asegurado que estas nuevas medidas son necesarias para garantizar la seguridad de todos los residentes del edificio.",
      comments: [
        {
          id: 1,
          author: "Juan Pérez",
          text: "Me parece muy bien, la seguridad es lo más importante.",
        },
        {
          id: 2,
          author: "Ana Gómez",
          text: "Me preocupa un poco la privacidad, ¿las cámaras estarán grabando todo el tiempo?",
        },
      ],
    },
    {
      id: 3,
      title: "Nueva administración del edificio",
      date: "2 de abril de 2023",
      imageUrl: "https://source.unsplash.com/random/1280x720",
      content:
        "La administración del edificio ha cambiado recientemente y se han implementado varios cambios importantes. El nuevo administrador ha prometido mejorar la limpieza y el mantenimiento del edificio, así como la eficiencia en la gestión de los problemas de los residentes. También se ha establecido un nuevo sistema de registro de visitantes que requiere que los visitantes se registren en la recepción del edificio antes de acceder a los apartamentos. Los residentes han expresado su esperanza de que estos cambios mejoren la calidad de vida en el edificio. La administración del edificio ha cambiado recientemente y se han implementado varios cambios importantes. El nuevo administrador ha prometido mejorar la limpieza y el mantenimiento del edificio, así como la eficiencia en la gestión de los problemas de los residentes. También se ha establecido un nuevo sistema de registro de visitantes que requiere que los visitantes se registren en la recepción del edificio antes de acceder a los apartamentos. Los residentes han expresado su esperanza de que estos cambios mejoren la calidad de vida en el edificio. La administración del edificio ha cambiado recientemente y se han implementado varios cambios importantes. El nuevo administrador ha prometido mejorar la limpieza y el mantenimiento del edificio, así como la eficiencia en la gestión de los problemas de los residentes. También se ha establecido un nuevo sistema de registro de visitantes que requiere que los visitantes se registren en la recepción del edificio antes de acceder a los apartamentos. Los residentes han expresado su esperanza de que estos cambios mejoren la calidad de vida en el edificio. La administración del edificio ha cambiado recientemente y se han implementado varios cambios importantes. El nuevo administrador ha prometido mejorar la limpieza y el mantenimiento del edificio, así como la eficiencia en la gestión de los problemas de los residentes. También se ha establecido un nuevo sistema de registro de visitantes que requiere que los visitantes se registren en la recepción del edificio antes de acceder a los apartamentos. Los residentes han expresado su esperanza de que estos cambios mejoren la calidad de vida en el edificio. La administración del edificio ha cambiado recientemente y se han implementado varios cambios importantes. El nuevo administrador ha prometido mejorar la limpieza y el mantenimiento del edificio, así como la eficiencia en la gestión de los problemas de los residentes. También se ha establecido un nuevo sistema de registro de visitantes que requiere que los visitantes se registren en la recepción del edificio antes de acceder a los apartamentos. Los residentes han expresado su esperanza de que estos cambios mejoren la calidad de vida en el edificio. La administración del edificio ha cambiado recientemente y se han implementado varios cambios importantes. El nuevo administrador ha prometido mejorar la limpieza y el mantenimiento del edificio, así como la eficiencia en la gestión de los problemas de los residentes. También se ha establecido un nuevo sistema de registro de visitantes que requiere que los visitantes se registren en la recepción del edificio antes de acceder a los apartamentos. Los residentes han expresado su esperanza de que estos cambios mejoren la calidad de vida en el edificio. La administración del edificio ha cambiado recientemente y se han implementado varios cambios importantes. El nuevo administrador ha prometido mejorar la limpieza y el mantenimiento del edificio, así como la eficiencia en la gestión de los problemas de los residentes. También se ha establecido un nuevo sistema de registro de visitantes que requiere que los visitantes se registren en la recepción del edificio antes de acceder a los apartamentos. Los residentes han expresado su esperanza de que estos cambios mejoren la calidad de vida en el edificio. ",
      comments: [
        {
          id: 1,
          author: "María Fernández",
          text: "Me alegra ver que están tomando medidas para mejorar la calidad de vida en el edificio.",
        },
        {
          id: 2,
          author: "Roberto Torres",
          text: "Espero que el nuevo administrador sea capaz de cumplir sus promesas.",
        },
      ],
    },
    {
      id: 4,
      title: "Nuevo horario de atención al cliente",
      date: "1 de abril de 2023",
      imageUrl: "https://source.unsplash.com/random/900x600",
      content:
        "La oficina de atención al cliente del edificio ha anunciado un nuevo horario de atención al público. A partir del próximo lunes, la oficina estará abierta de lunes a viernes de 9am a 5pm, y los sábados de 9am a 12pm. Los residentes podrán acudir a la oficina para solicitar información sobre el edificio, hacer reclamos, o solicitar asistencia en caso de emergencia. La oficina también estará disponible por teléfono y correo electrónico durante todo el horario de atención al público.",
      comments: [
        {
          id: 1,
          author: "Pedro García",
          text: "Me parece bien que amplíen el horario de atención al público.",
        },
        {
          id: 2,
          author: "Ana Gómez",
          text: "Espero que esto no signifique que la oficina estará menos disponible.",
        },
      ],
    },
  ];

  return (
    <div className=" p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Últimas noticias</h1>
      {newsItems.map((newsItem) => (
        <News
          key={newsItem.id}
          title={newsItem.title}
          date={newsItem.date?.toDate().toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" })}
          imageUrl={newsItem.imageUrl}
          content={newsItem.content}
          comments={newsItem?.comments}
        />
      ))}
    </div>
  );
};

export default HomePage;
