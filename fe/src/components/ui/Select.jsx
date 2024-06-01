
const Select = ({ label, options, onChange }) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label className="mb-2 text-md font-semibold text-gray-700">
            {label}
          </label>
        )}
        <select
          onChange={onChange}
          className="px-3 py-2 text-gray-700 bg-white border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
         <option value="">Select option</option>
  
          {options.map((option, index) => (
            <option className="text-black" key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Select;