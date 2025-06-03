import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
export default function BackButton() {
  return (
    <Link to={"/"}>
      <div className="flex justify-center items-center gap-x-2 bg-sky-600 text-white border-none rounded w-20 h-10 p-2">
        <BsArrowLeft />
        Back
      </div>
    </Link>
  );
}
