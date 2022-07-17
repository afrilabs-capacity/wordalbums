import LeftNav from "../layout/left-nav.js";
import RightNav from "../layout/right-nav.js";
import Footer from "../layout/footer.js";

function Master({ component }) {
  return (
    <div className="">
      <div className="grid md:grid-cols-5 h-screen">
        <LeftNav />
        <main className="MainBackground col-span-4">{component}</main>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default Master;
