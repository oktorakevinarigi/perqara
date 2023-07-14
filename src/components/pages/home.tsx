import { Header, Footer, SimpleBlock } from "@/components/layouts";
import { DiscoverMovies, Banner } from "../feature";

export function HomePage() {
  return (
    <>
      <div className="bg-gray-default h-[66px]">
        <Header />
      </div>
      <Banner />
      <SimpleBlock>
        <DiscoverMovies />
      </SimpleBlock>
      <Footer />
    </>
  );
}
