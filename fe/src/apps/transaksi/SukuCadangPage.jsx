import Navbar from "../../components/navbar";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import CardSC from "./CardSC";
import api from "../../utils/axios";
import Loading from "../../components/ui/Loading";
import { showToast } from "../../components/ui/Toaster";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

// Custom hook to debounce input
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timer on change
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SukuCadangPage() {
  const [data, setData] = useState([]);
  const [merek, setMerek] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMerek, setSelectedMerek] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading for initial load
  const [isSearchLoading, setIsSearchLoading] = useState(false); // Loading for search

  // Apply debounce for search and selectedMerek
  const debouncedSearch = useDebounce(search, 700); // Delay 300ms
  const debouncedMerek = useDebounce(selectedMerek, 500); // Delay 300ms

  // Fetch merek data once when the component mounts
  useEffect(() => {
    const fetchMerek = async () => {
      setIsLoading(true); // Initial load
      try {
        const { data: merekData } = await api.get("/getAllMerek");
        setMerek(merekData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // End initial load
      }
    };
    fetchMerek();
  }, []);

  useEffect(() => {
    const fetchSukuCadang = async () => {
      setIsSearchLoading(true); // Loading for search/filter
      try {
        const queryParams = new URLSearchParams();
        if (debouncedSearch) queryParams.append("search", debouncedSearch);
        if (debouncedMerek) queryParams.append("merekId", debouncedMerek);

        const { data: response } = await api.get(
          `/getAllSukuCadang?${queryParams.toString()}`
        );
        setData(response.data);
        if (!response.success) {
          showToast(response.message, response.success);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSearchLoading(false); // End loading for search
      }
    };

    // Fetch only when debounced values change
    fetchSukuCadang();
  }, [debouncedSearch, debouncedMerek]); // Trigger API call only after debounce delay

  if (isLoading) return <Loading />; // Initial page loading

  return (
    <div>
      <Navbar />
      <Toaster />
      <section className="md:mt-36 mt-20 mx-4 md:mx-12">
        <div className="pb-6 border-b-2">
          <h1 className="text-2xl font-semibold">Suku Cadang Fixolution</h1>
          <p className="text-md text-gray-500">
            Jaga Kendaraan Tetap Prima dengan Suku Cadang Terbaik !!
          </p>
        </div>

        {/* Input search and filter */}
        <div className="flex items-center justify-between mt-8">
          <Input
            customClass="bg-transparent border-gray-800"
            placeholder="Cari Suku Cadang"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Set search input value
          />
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <p className="hidden md:block">Filter by Merek</p>
            <Select
              options={merek.map((item) => ({
                label: item.nama_merek,
                value: item.id,
              }))}
              onChange={(e) => setSelectedMerek(e.target.value)} // Set selected merek
            />
          </div>
        </div>

        {/* Product cards */}
        <div className="mt-12">
          {isSearchLoading ? ( // Conditional rendering for search loading
            <div className="flex justify-center items-center h-64">
              <Loading />
            </div>
          ) : data.length > 0 ? (
            <CardSC
              onClick={(id) =>
                (window.location.href = `/detailSukuCadang/${id}`)
              }
              products={data}
            />
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Belum Ada Suku Cadang</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
