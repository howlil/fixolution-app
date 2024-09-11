import CardBooking from "./CardBooking";
import CardService from "./CardService";

export default function Selesai({ data, dataSTG }) {
  const tipe = data.type;
  const tipeSTG = dataSTG.type;
  const isSelesai = Array.isArray(data?.data)
    ? data.data.filter(
        (item) => item.status === "APPROVED" || item.status === "REJECTED"
      )
    : [];

  const isSelesaiStg = Array.isArray(dataSTG?.data)
    ? dataSTG?.data?.filter(
        (item) => item.status === "APPROVED" || item.status === "REJECTED"
      )
    : [];

  return (
    <div>
      {isSelesai &&
        isSelesai.map((item) => (
          <CardBooking key={item.id} pesanan={item} tipe={tipe} />
        ))}
      {isSelesaiStg &&
        isSelesaiStg.map((item) => (
          <CardService key={item.id} service={item} tipe={tipeSTG} />
        ))}
    </div>
  );
}
