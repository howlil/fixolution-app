import CardBooking from "./CardBooking";
import CardService from "./CardService";

export default function Berlangsung({ data, dataSTG }) {
  const tipe = data.type ;
  const tipeSTG = dataSTG.type;
  const isPending = Array.isArray(data?.data)
    ? data.data.filter((item) => item.status === "PENDING")
    : [];

  const isPendingSTG = Array.isArray(dataSTG?.data)
    ? dataSTG?.data?.filter((item) => item.status === "PENDING")
    : [];


  return (
    <div>
      {isPending &&
        isPending.map((item) => (
          <CardBooking key={item.id} pesanan={item} tipe={tipe} />
        ))}
      {isPendingSTG &&
        isPendingSTG.map((item) => (
          <CardService key={item.id} service={item} tipe={tipeSTG} />
        ))}
    </div>
  );
}
