import React, { useState, useContext, useEffect } from "react";
import { loginContext, toastContext } from "../../appContext.js";
import TextInput from "../common/inputs/textInput.js";
import TextArea from "../common/inputs/textArea.js";
import DBAccess from "../../utils/dbAccess.js";
import UploadImage from "../common/inputs/uploadImage.js";
import StorageAccess from "../../utils/storageAccess.js";
import imagePlaceholder from "../../assets/imagePlaceholder.png";

const ManageNews = () => {
  const newsDB = new DBAccess("news");
  const storageAccess = new StorageAccess();
  const userContext = useContext(loginContext);
  const toast = useContext(toastContext);
  const [validationTrigger, setValidationTrigger] = useState(0);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState(imagePlaceholder);
  const [selectedFile, setSelectedFile] = useState(imagePlaceholder);
  const [content, setContent] = useState("");
  const [newsItems, setNewsItems] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      let news = await newsDB.getAll("Solarium", "news");
      news.sort((a, b) => new Date(b.date.seconds) - new Date(a.date.seconds));
      setNewsItems(news);
    };
    fetchNews();
  }, [refreshTrigger]);

  useEffect(() => {
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  }, [file]);

  const validateNotEmpty = (value) => {
    const valid = value.trim().length > 0;
    return valid;
  };

  const validateForm = () => {
    const valid = validateNotEmpty(title) && validateNotEmpty(content);
    setValidationTrigger(validationTrigger + 1);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      saveNews();
    }
  };

  const handleUpload = async () => {
    if (file) {
      const imageUrlUploaded = await storageAccess.uploadFile(file, Date.now());
      setImageUrl(imageUrlUploaded);
      return imageUrlUploaded;
    }
  };

  const saveNews = async () => {
    const url = await handleUpload();
    const DATA_TO_SAVE = {
      date: new Date(),
      condoName: userContext.aditionalData.condoName,
      title: title,
      imageUrl: url ? url : "placeholder",
      content: content,
    };
    await newsDB.create(DATA_TO_SAVE, DATA_TO_SAVE.condoName, "news");
    setRefreshTrigger(!refreshTrigger);
    toast.set({
      message: "Noticia publicada exitosamente.",
      type: "success",
      timeOut: 2500,
    });
  };

  const deleteNews = async (id) => {
    const result = await newsDB.remove(userContext.aditionalData.condoName, "news", id);
    if (result === undefined) {
      toast.set({
        message: "Noticia eliminada exitosamente.",
        type: "success",
        timeOut: 2500,
      });
      setRefreshTrigger(!refreshTrigger);
      return;
    }
    toast.set({
      message: "D'oh! Algo salió mal.",
      type: "error",
      timeOut: 5500,
    });
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:py-12 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Publicar nueva noticia</h1>
      <div className="flex flex-row bg-white rounded-lg overflow-hidden shadow-lg my-12">
        {selectedFile && (
          <div className="w-1/3 max-h-64 flex justify-center items-center">
            <img src={selectedFile} alt={title} className="object-scale-down rounded-lg" />
          </div>
        )}
        <form className="w-2/3 p-4" onSubmit={handleSubmit}>
          <div className="pb-4 border-b border-gray-200">
            <div className="my-4">
              <TextInput
                labelText="Título"
                id="titulo"
                name="titulo"
                placeholder="Título"
                setValue={setTitle}
                validationFunction={validateNotEmpty}
                validationTrigger={validationTrigger}
                errorText="Escriba un titulo para la noticia."
              />
            </div>
            <p className="text-gray-500">
              {new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="pt-4">
            <TextArea
              labelText="Contenido"
              id="contenido"
              name="contenido"
              placeholder="Contenido"
              setValue={setContent}
              validationFunction={validateNotEmpty}
              validationTrigger={validationTrigger}
              errorText="Escriba un contenido para la noticia."
            />
          </div>
          <div className="pt-4">
            <UploadImage labelText="Imagen de la noticia (No requerida)" setFile={setFile}></UploadImage>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="items-center justify-center px-3 py-3 rounded-lg w-40 font-semibold text-sm duration-150 text-white bg-greenTheme hover:bg-indigo-500 active:bg-indigo-700"
            >
              Publicar noticia
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-lg my-12 w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Lista de noticias</h1>
        <table className="table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Fecha</th>
              <th className="py-3 px-6">Título</th>
              <th className="py-3 px-6">Contenido</th>
              <th className="py-3 px-6">Imagen</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {newsItems.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 max-w-sm">{item.date.toDate().toLocaleDateString()}</td>
                <td className="px-6 py-4 max-w-sm">{item.title}</td>
                <td className="px-6 py-4 w-96">{item.content.substring(0, 120) + "..."}</td>
                <td className="px-6 py-4 max-w-sm">
                  {item.imageUrl !== "placeholder" ? (
                    <img src={item.imageUrl} alt={title} className="w-full h-[200px] object-scale-down rounded-lg" />
                  ) : (
                    "Sin imagen"
                  )}
                </td>
                <td className="text-right px-6 whitespace-nowrap">
                  <button
                    className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                    onClick={() => deleteNews(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageNews;
