import Header from "../components/header/Header";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="w-[1200px] m-auto flex justify-between items-center my-8">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
