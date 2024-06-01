export default function Input({ label, type, placeholder, value, onChange, customLabel,customClass }) {
  return (
    <div className="flex flex-col gap-y-1 ">
      <label className={ `font-normal   ${customLabel}`}>
        {label}
      </label>
      <input
        className={`border rounded-2xl w-full py-2 px-4 text-sm  ${customClass}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}