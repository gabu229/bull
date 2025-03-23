import { redirect } from "next/navigation";

const HomePage = () => {
  redirect(`/cryptocurrencies`);
};

export default HomePage;
