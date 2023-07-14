import { Header, Footer, SimpleBlock } from "@/components/layouts";
import { DiscoverMovies, Banner } from "../feature";

export function HomePage() {
  return (
    <div>
      <Header />
      <section className="sandbox__carousel">
        <Banner />
      </section>
      <SimpleBlock>
        <DiscoverMovies />
      </SimpleBlock>
      <Footer />
    </div>
  );
}
