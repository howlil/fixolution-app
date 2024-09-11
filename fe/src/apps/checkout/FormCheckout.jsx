import { useState } from "react";
import Input from "../../components/ui/Input";

export default function FormCheckout() {
  const [formValues, setFormValues] = useState({
    provinsi: '',
    kota: '',
    kecamatan: '',
    kelurahan: '',
    kodepos: '',
    alamatLengkap: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  return (
    <div className="mt-8">
      <form className="space-y-4">
        <div>
          <h2 className="font-semibold">Alamat</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Provinsi"
                id="provinsi"
                type="text"
                placeholder="Masukkan Provinsi"
                value={formValues.provinsi}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Input
                label="Kota"
                id="kota"
                type="text"
                placeholder="Masukkan Kota"
                value={formValues.kota}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Input
                label="Kecamatan"
                id="kecamatan"
                type="text"
                placeholder="Masukkan Kecamatan"
                value={formValues.kecamatan}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Input
                label="Kode Pos"
                id="kodepos"
                type="text"
                placeholder="Masukkan Kode Pos"
                value={formValues.kodepos}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="alamatLengkap">Alamat Lengkap<span className="text-red-500">*</span></label>
              <textarea
                id="alamatLengkap"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Masukkan Alamat Lengkap"
                rows="3"
                
                value={formValues.alamatLengkap}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
