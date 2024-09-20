import CardBooking from "./CardBooking";
import CardService from "./CardService";
import CardSukuCadang from "./CardSukuCadang";

export default function Selesai({ data, dataSTG,dataSuku }) {
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

  const isSelesaiSuku = Array.isArray(dataSuku?.data) 
    ? dataSuku?.data?.filter(
        (item) => item.status === "DITERIMA" || item.status === "DITOLAK"
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
      {isSelesaiSuku &&
        isSelesaiSuku.map((item) => (
          <CardSukuCadang key={item.id} service={item} />
        ))}
    </div>
  );
}
