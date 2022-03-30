import buildCient from "../api/buildCient";

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>Youre signed in</h1>
  ) : (
    <h1> Youre not signed in </h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  const api = buildCient(context);
  const res = await api.get("/api/users/currentuser").catch((err) => {
    console.log("There was an error getting current user", err.message);
  });
  return res?.data;
};

export default LandingPage;
