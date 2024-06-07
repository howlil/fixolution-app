import { Trash, Edit } from "lucide-react";
const getNestedProperty = (obj, path) => {
  return path.split('.').reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : undefined, obj);
}

const Tables = ({ columns, data, onEdit, onDelete }) => {
  return (
    <table className="w-full  ">
      <thead className="bg-neutral-100  rounded-t-lg">
        <tr>
          <th className=" font-semibold">No</th>
          {columns.map((column, index) => (
            <th className="py-2  font-semibold text-start pl-4" key={index}>{column.header}</th>
          ))}
          <th className="text-end  font-semibold  pr-6">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((row, rowIndex) => (
          <tr className="border-b border-neutral-300" key={rowIndex}>
            <td className="text-center">{rowIndex + 1}</td> 
            {columns.map((column, colIndex) => (
              <td className="py-2 text-start pl-4" key={colIndex}>{getNestedProperty(row, column.accessor)}</td>
            ))}
            <td className="py-2 flex justify-end">
              <div onClick={() => onEdit(row)} className="cursor-pointer ts active:scale-110 hover:scale-110">
                 <Edit size={20} className="mr-2 mt-1" color="orange" />
              </div>
              <div onClick={() => onDelete(row)} className="cursor-pointer ts active:scale-110 hover:scale-110" >
                 <Trash size={20} className="mr-2 mt-1" color="red" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tables;