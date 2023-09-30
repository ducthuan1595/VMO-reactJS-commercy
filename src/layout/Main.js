import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-[#f0f0f0]">
      <Header />
      <div className="w-[1200px] m-auto flex flex-col items-center my-8">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
