import "bootstrap/dist/css/bootstrap.css";
import buildCient from "../api/buildCient";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser}></Header>
      <div className="container">
        <Component currentUser={currentUser} {...pageProps}></Component>
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  console.log("Get initial props ...");
  const api = buildCient(appContext.ctx);
  const res = await api.get("/api/users/currentuser").catch((err) => {
    console.log("There was an error getting current user", err.message);
  });

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      api,
      res?.data?.currentUser
    );
  }

  return {
    pageProps,
    ...res?.data,
  };
};

export default AppComponent;
