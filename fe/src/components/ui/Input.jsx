export default function Input({ label, type, placeholder, value, onChange }) {
    return (
      <div className="flex flex-col gap-y-1 ">
        <label className="font-normal  text-sm text-white" htmlFor="">
          {label}
        </label>
        <input
          className="border rounded-2xl w-full py-2 px-4 text-sm bg-neutral-900 text-neutral-200  border-neutral-100"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
        />
      </div>
    );
  }