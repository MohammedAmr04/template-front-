import { Montserrat, Almarai } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});
