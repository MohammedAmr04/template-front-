import Image from "next/image";

const Logo = () => {
  return (
    <>
      <Image src={"/images/logo.svg"} alt="Eiadat" width={120} height={40} />
    </>
  );
};

export default Logo;
