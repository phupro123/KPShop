import Header from "./Components/Header";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default DefaultLayout;
