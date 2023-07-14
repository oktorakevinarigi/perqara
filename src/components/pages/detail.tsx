import { Header, Footer, SimpleBlock } from "@/components/layouts";
import { BannerDetail, Review, Recommendation } from "../feature";

export function DetailPage() {
  return (
    <div>
      <Header />
      <div className="bg-white">
        <BannerDetail />
        <SimpleBlock className="py-11">
          <Review />
        </SimpleBlock>
      </div>
      <SimpleBlock className="my-[50px]">
        <Recommendation />
      </SimpleBlock>
      <Footer />
    </div>
  );
}
