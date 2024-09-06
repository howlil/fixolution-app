import ReactLoading from "react-loading";

export default function Loading({ type = "spin", color }) {
  return (
    <div className="bg-black bg-opacity-75 fixed inset-0 flex justify-center items-center z-[9999]">
      <ReactLoading type={type} color={color} height={50} width={50} />
    </div>
  );
}
