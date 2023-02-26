import mainBackground from "../../../assets/mainBaner1.jpg";
import appLogo from "../../../assets/logos/condoHubLogoOnlyTransparentGreenLight.png";

const MainBanner = () => {
  return (
    <div
      class="sm:pl-80 sm:pr-40 h-[500px] w-full p-10 flex bg-[center_top_-15rem]"
      style={{ backgroundImage: `url(${mainBackground})` }}
    >
      <div className="font-bold text-white w-full" id="start">
        <div className="text-6xl drop-shadow-2xl sm:text-left">Conecta tu</div>
        <div className="text-6xl drop-shadow-2xl sm:text-left">Condominio</div>
      </div>
      <div className="bg-black w-auto h-min flex justify-center items-center p-10">
        <div className="font-bold text-white p-10 flex justify-center items-center">
          <img
            className="flex justify-center items-center"
            src={appLogo}
            width={100}
            height={100}
            alt="CondoHUB logo"
          />
          <div className="text-5xl drop-shadow-2xl sm:text-left">CondoHUB</div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
