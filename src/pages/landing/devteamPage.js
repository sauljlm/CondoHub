import devEduardoPhoto from "../../assets/devEduardoRomaguera.png";
import devTatianaPhoto from "../../assets/devTatianaAraya.png";
import devSaulPhoto from "../../assets/devSaulLopez.png";
import Dev from "../../components/landing/dev.js";

const Devteam = () => {
  const devEduardo = {
    name: "Eduardo Romaguera",
    position1: "Developer",
    position2: "Product Owner",
    description:
      "Eduardo trabaja actualmente como quality engineer automation. Es estudiante de ingeniería en desarrollo de software en Cenfotec, una persona de gatos y su juego favorito es Apex Legends. En una vida pasada fue químico y obtuvo un MBA.",
    photo: devEduardoPhoto,
    portafolio: "eromaguera.com",
    linkedin: "www.linkedin.com/in/eromaguera/",
  };
  const devTatiana = {
    name: "Tatiana Araya",
    position1: "Developer",
    position2: "Scrum Master",
    description:
      "Tatiana Araya trabaja como quality engineer automation. Es estudiante de ingeniería en desarrollo de software en Cenfotec. Tiene dos gatitas grises y le encanta Friends. Antes de programar era Ing. Civil.",
    photo: devTatianaPhoto,
    linkedin: "linkedin.com/in/tatiana-araya-mu%C3%B1oz/",
  };
  const devSaul = {
    name: "Saul Lopez",
    position1: "Developer",
    position2: "Art & Graphic Dessign",
    description:
      "Saúl trabaja actualmente como front end developer. Es estudiante de ingeniería en desarrollo de software en Cenfotec. Tiene una gata llamada Lúlu.",
    photo: devSaulPhoto,
    linkedin: "linkedin.com/in/saul-lopez-715536165/",
  };
  return (
    <div>
      <div className="text-center text-3xl text-gray-800 font-semibold my-20"> Equipo de desarrollo</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-self-center my-20">
        <Dev developer={devEduardo}></Dev>
        <Dev developer={devTatiana}></Dev>
        <Dev developer={devSaul}></Dev>
      </div>
    </div>
  );
};

export default Devteam;
