import DetailReport from "./routes/DetailReport";
import GeneralReport from "./routes/GeneralReport";

const App = () => {
  const route = window.location.pathname;

  return route === "/summary" ? <GeneralReport /> : <DetailReport />;
};

export default App;
