import React, { useState, useContext, useEffect, useRef } from "react";
import { loginContext } from "../../../appContext.js";
import DBAccess from "../../../utils/dbAccess";

const NotificationsPopup = ({ display, buttonRef, notifications }) => {
  const newsDB = new DBAccess("news");
  const userContext = useContext(loginContext);
  const [newsItems, setNewsItems] = useState([]);
  const [render, setRender] = useState(false);
  const notificationsPopupRef = useRef(null);

  useEffect(() => {
    const fetchNews = async () => {
      let news = await newsDB.getAll(userContext?.aditionalData?.condoName, "news");
      console.log(news[1]?.date.seconds);
      if (news.length > 0) {
        news = news.slice(0, 7);
        news.sort((a, b) => new Date(b?.date.seconds) - new Date(a?.date.seconds));
      }
      setNewsItems(news);
    };
    userContext?.aditionalData ? fetchNews() : null;
  }, [userContext]);

  const notifications2 = [
    {
      id: 1,
      title: "Recordatorio de pago de mantenimiento",
      description:
        "Este es un recordatorio amistoso de que el pago de mantenimiento debe realizarse antes del 5 de abril.",
      date: "2 abril 2023",
    },
    {
      id: 2,
      title: "Nuevos horarios de la piscina",
      description: "A partir del 6 de abril, los horarios de la piscina cambiarán de 9 a.m. a 7 p.m.",
      date: "1 abril 2023",
    },
    {
      id: 3,
      title: "Mantenimiento en las áreas comunes",
      description:
        "Este lunes 5 de abril, se llevará a cabo el mantenimiento en las áreas comunes. Pedimos su comprensión y colaboración para evitar inconvenientes.",
      date: "29 marzo 2023",
    },
    {
      id: 4,
      title: "Pagos en atraso",
      description:
        "A todos los vecinos que tienen pagos en atraso, se les recuerda que deben realizar el pago antes del 5 de abril.",
      date: "29 marzo 2023",
    },
  ];

  useEffect(() => {
    setRender(!render);
  }, [display]);

  useEffect(() => {
    setRender(false);
  }, []);

  const handleClickOutside = (event) => {
    if (
      !notificationsPopupRef.current?.contains(event.target) &&
      !buttonRef.current?.contains(event.target) &&
      render
    ) {
      document.removeEventListener("mousedown", handleClickOutside);
      setRender(!render);
    }
  };

  useEffect(() => {
    if (render) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    if (!render) {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [render]);

  return (
    <div ref={notificationsPopupRef}>
      {render && (
        <div className="fixed top-16 right-28 bg-zinc-800 drop-shadow-xl rounded-lg p-4 text-gray-100 max-w-md">
          <h2 className="font-bold mb-2 text-lg">Notificaciones</h2>
          <div className="space-y-2">
            {newsItems.map((notification, index) => (
              <div
                key={index}
                className="p-5 text-gray-300 rounded-lg text-sm overflow-hidden break-words hover:bg-gray-700"
              >
                <h3 className="font-bold mb-1">{notification.title}</h3>
                <p className="truncate">{notification.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPopup;
