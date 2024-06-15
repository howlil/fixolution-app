
const Select = ({ label, options, onChange }) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label className="mb-1 text-md font-semibold text-gray-700">
            {label}
          </label>
        )}
        <select
          onChange={onChange}
          className="px-3 py-1.5 text-gray-700 border-neutral-400 rounded-2xl border"
        >
         <option value="">Select </option>
  
          {options?.map((option, index) => (
            <option className="text-black" key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Select;