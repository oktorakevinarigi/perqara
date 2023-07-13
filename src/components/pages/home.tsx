import { Header, Footer, SimpleBlock } from "@/components/layouts";
import { DiscoverMovies } from "../feature";

export function HomePage() {
  return (
    <div>
      <Header />
      <SimpleBlock>
        <DiscoverMovies />
      </SimpleBlock>
      <Footer />
    </div>
  );
}
