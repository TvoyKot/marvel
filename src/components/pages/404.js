import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
  return (
    <div>
      <Helmet>
        <meta content="Page didn't find"></meta>
        <title>Page not found</title>
      </Helmet>
      <ErrorMessage />
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>
        Page doesn't exist
      </p>
      <Link
        to="/"
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
        }}
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
