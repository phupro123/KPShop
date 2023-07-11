import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div class="flex flex-col justify-center items-center min-h-fit-layout">
      <h1>An error as occured.</h1>
      <h1>
        <span>(╯°□°）╯︵ ┻━┻</span>
      </h1>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default NotFound;
