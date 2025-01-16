import React from "react";

const Table = ({
  columns,
  data,
  onEdit,
  onDelete,
  onManageSongs,
  showManageSongs,
  currentPage=0,
  totalPages=0,
  onPageChange, 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {columns.map((column) => (
              <th key={column.key} className="py-3 px-6 text-left">
                {column.label}
              </th>
            ))}
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              {columns.map((column) => (
                <td key={column.key} className="py-3 px-6 text-left">
                  {row[column.key]}
                </td>
              ))}
              <td className="py-3 px-6 text-center">
                {showManageSongs && (
                  <button
                    onClick={() => onManageSongs(row)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Manage Songs
                  </button>
                )}
                <button
                  onClick={() => onEdit(row)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(row)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
