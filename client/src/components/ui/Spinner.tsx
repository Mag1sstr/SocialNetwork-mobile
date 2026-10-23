import { FadeLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <FadeLoader color="#6478FF" className="ml-2.5" />
    </div>
  );
}

export default Spinner;
