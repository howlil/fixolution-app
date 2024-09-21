import { useState } from "react";
import Button from "../../components/ui/Button";

export default function FormCheckout({ onSubmit,onClick }) {
  const [formValues, setFormValues] = useState({
    provinsi: '',
    kota: '',
    kecamatan: '',
    kelurahan: '',  // Kelurahan ditambahkan
    kode_pos: '',
    alamat: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues); // Kirim data form ke CheckoutIndex
  };

  return (
    <div className="my-8">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <h2 className="font-semibold">Alamat</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="provinsi" className="block font-medium">Provinsi</label>
              <input
                id="provinsi"
                type="text"
                placeholder="Masukkan Provinsi"
                value={formValues.provinsi}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="kota" className="block font-medium">Kota</label>
              <input
                id="kota"
                type="text"
                placeholder="Masukkan Kota"
                value={formValues.kota}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="kecamatan" className="block font-medium">Kecamatan</label>
              <input
                id="kecamatan"
                type="text"
                placeholder="Masukkan Kecamatan"
                value={formValues.kecamatan}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="kelurahan" className="block font-medium">Kelurahan</label>
              <input
                id="kelurahan"
                type="text"
                placeholder="Masukkan Kelurahan"
                value={formValues.kelurahan}  // Kelurahan ditambahkan
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="kodepos" className="block font-medium">Kode Pos</label>
              <input
                id="kode_pos"
                type="text"
                placeholder="Masukkan Kode Pos"
                value={formValues.kode_pos}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="alamatLengkap" className="block font-medium">Alamat Lengkap <span className="text-red-500">*</span></label>
              <textarea
                id="alamat"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Masukkan Alamat Lengkap"
                rows="3"
                value={formValues.alamat}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
          </div>
        </div>
        <Button  onClick={onClick} type="submit" variant="primary" custom="w-full py-2">
          Checkout
        </Button>
      </form>
    </div>
  );
}
