import Header from "../components/header/Header";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
