import { useState } from "react";
import PropTypes from "prop-types";

ShowData.propTypes = {
  dataTable: PropTypes.array.isRequired,
};

export default function ShowData({ dataTable }) {
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // กำหนดจำนวนแถวต่อหน้า (เปลี่ยนได้)

  // คำนวณจำนวนหน้า
  const totalPages = Math.ceil(dataTable.length / pageSize);

  // หาข้อมูลสำหรับหน้า currentPage
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = dataTable.slice(startIndex, startIndex + pageSize);

  const goToPage = (page) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto pad-main">
      <div className="mb-3 flex justify-between items-center">
        {/* เลือกจำนวนแถวต่อหน้า */}
        <div>
          <label htmlFor="pageSize" className="mr-2 font-medium">
            จำนวนแถว(หน้า)
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1); // กลับหน้าแรกเมื่อเปลี่ยนขนาดหน้า
            }}
            className="border rounded px-2 ml-4 py-1"
          >
            {[5, 10, 20, 50, 100, 500, 1000].map((size) => (
              <option key={size} value={size} className="text-black">
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* pagination controls */}
        <div className="flex gap-2 items-center">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">
            ก่อนหน้า
          </button>

          <span>
            หน้า {currentPage} / {totalPages}
          </span>

          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">
            ถัดไป
          </button>
        </div>
      </div>

      <table className="min-w-full table-fixed">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[5%]">ลำดับ</th>
            <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[20%]">รหัส</th>
            <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[20%]">รายการ</th>
            <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[15%]">ราคา</th>
            <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[15%]">จำนวน</th>
            <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[25%]">เดือน</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <></>
          ) : dataTable?.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-red-500 bg-red-100 h-30">
                <p className="text-xl"> 🕵️‍♂️ ไม่มีข้อมูลที่จะแสดง ณ ตอนนี้</p>
              </td>
            </tr>
          ) : (
            currentData.map((item, index) => (
              <tr key={startIndex + index} className="bg-white text-black">
                <td className="border border-gray-300 !p-3 text-center">{startIndex + index + 1}</td>
                <td className="border border-gray-300 !p-3 text-center">
                  <p>{item.code}</p>
                </td>
                <td className="border border-gray-300 !p-3 text-center">{item.productName}</td>
                <td className="border border-gray-300 !p-3 text-center">
                  <p>{item.price}</p>
                </td>
                <td className="border border-gray-300 !p-3 text-center">
                  <p>{item.amount}</p>
                </td>
                <td className="border border-gray-300 !p-3 text-center">
                  <p>{item.createdAt}</p>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
