import { Header, Footer, SimpleBlock } from "@/components/layouts";
import { DiscoverMovies, Banner } from "../feature";

export function HomePage() {
  return (
    <>
      <div className="bg-gray-default h-[66px]">
        <Header />
      </div>
      <Banner />
      <div className="bg-white bg-opacity-[0.05] w-full h-[315px] absolute -z-10 top-[580px]" />
      <SimpleBlock className="pt-[89px]">
        <DiscoverMovies />
      </SimpleBlock>
      <Footer />
    </>
  );
}
