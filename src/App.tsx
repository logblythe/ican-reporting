import DetailReport from "./routes/DetailReport";
import GeneralReport from "./routes/GeneralReport";
import PageNotFound from "./routes/PageNotFound";
import WelcomePage from "./routes/WelcomePage";

const App = () => {
  const route = window.location.pathname;
  const searchParams = window.location.search;

  if (route === "/summary") {
    return <GeneralReport />;
  }
  if (searchParams) return <DetailReport />;

  if (route === "/") return <WelcomePage />;

  return <PageNotFound />;
};

export default App;
