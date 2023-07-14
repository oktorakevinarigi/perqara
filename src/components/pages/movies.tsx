import { Header, Footer, SimpleBlock } from "@/components/layouts";
import { Movies } from "../feature";

export function MoviesPage() {
  return (
    <>
      <div className="bg-gray-default h-[66px]">
        <Header />
      </div>
      <div className="bg-white bg-opacity-[0.05] w-full h-[315px] absolute -z-10" />
      <div className="py-14">
        <SimpleBlock>
          <Movies />
        </SimpleBlock>
      </div>

      <Footer />
    </>
  );
}
