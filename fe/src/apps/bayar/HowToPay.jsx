import img from "../../images/QRCODE.jpg";
const HowToPay = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-start">
      <div>
        <h2 className="text-xl font-normal  rounded-md mb-4">
          Tata Cara Pembayaran
        </h2>
        <ol className="list-decimal pl-4 text-sm list-inside space-y-2">
          <li>Scan QR Code Disamping</li>
          <li>Selesaikan Pembayaran</li>
          <li>Upload Bukti Pembayaran</li>
          <li>Selesai</li>
        </ol>
      </div>
      <div className="flex-shrink-0">
        <img src={img} alt="QR Code" className="w-36 h-36" />
      </div>
    </div>
  );
};

export default HowToPay;
