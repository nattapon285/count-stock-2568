import { useState } from "react";
import PropTypes from "prop-types";
import DataDate from "../../helpers/DataDate.json";

ShowData.propTypes = {
  dataTable: PropTypes.array.isRequired,
  exportExcelFile: PropTypes.func,
  onDeleteItem: PropTypes.func.isRequired, // เพิ่มตรงนี้
};

export default function ShowData({ dataTable, exportExcelFile, onDeleteItem }) {
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
    <div className="pad-main">
      <div className="mb-3 flex justify-between w-full items-end pb-3">
        {/* เลือกจำนวนแถวต่อหน้า */}
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

        <div className="pad-main !mt-3">
          <button className="btn-excel" onClick={exportExcelFile}>
            <i className="fa-solid fa-file-excel text-xl"></i>
          </button>
        </div>
      </div>
      {console.log("currentData", currentData)}
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed" style={{ marginTop: "10px" }}>
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[5%]">ลำดับ</th>
              <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[20%]">รหัส</th>
              <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[25%]">รายการ</th>
              <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[15%]">ราคา</th>
              <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[10%]">จำนวน</th>
              <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[15%]">เดือน</th>
              <th className="border border-gray-300 !p-3 text-center font-medium whitespace-nowrap w-[10%]">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <></>
            ) : dataTable?.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-red-500 bg-red-100 h-30">
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
                  <td className="border border-gray-300 !p-3 text-center">
                    <button type="button" onClick={() => onDeleteItem({ itemCode: item.code, index, rowIndex: DataDate.find((f) => f.mount === item.createdAt)?.index })}>
                      <i class="fa-solid fa-trash-can text-red-500"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* pagination controls */}
      <div className="flex gap-2 items-center w-full" style={{ marginTop: "10px" }}>
        <button style={{ paddingRight: "8px" }} onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-1  rounded disabled:opacity-50">
          <i class="fa-solid fa-angle-left"></i>
        </button>

        <span>
          หน้า {currentPage} / {totalPages}
        </span>

        <button style={{ paddingLeft: "8px" }} onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-1  rounded disabled:opacity-50">
          <i class="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
}
