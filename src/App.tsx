import DetailReport from "./routes/DetailReport";
import GeneralReport from "./routes/GeneralReport";
import PageNotFound from "./routes/PageNotFound";
import WelcomePage from "./routes/WelcomePage";

const App = () => {
  const route = window.location.pathname;
  if (route === "/") return <WelcomePage />;
  if (route === "/summary") return <GeneralReport />;
  if (route === "/details") return <DetailReport />;
  return <PageNotFound />;
};

export default App;
