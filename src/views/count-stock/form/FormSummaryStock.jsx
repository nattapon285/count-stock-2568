import { Field, FieldArray, Form, Formik } from "formik";
import PropTypes from "prop-types";
import DataInner from "../../../helpers/DataInner.json";
import { Fragment } from "react";

FormSummaryStock.propTypes = {
  onComeBack: PropTypes.func,
  setDataRowsSummary: PropTypes.func,
  dataRowsSummary: PropTypes.object,
};

export default function FormSummaryStock({ dataRowsSummary, setDataRowsSummary, onComeBack }) {
  // ช่วยแปลงข้อมูลจาก dataRowsSummary ให้กลายเป็น items array
  const convertSummaryDataToItems = (summaryData) => {
    const result = [];

    Object.entries(summaryData).forEach(([, rows]) => {
      rows.forEach((row) => {
        const [itemCode] = row;

        result.push({
          category: DataInner.find((a) => a.items.includes(itemCode))?.category,
          itemCode,
          brought: 0,
          sale: 0,
        });
      });
    });

    return result;
  };
  return (
    <div className="card">
      <div className="container-title pad-main">
        <p className="text-3xl">เพิ่มข้อมูลสรุปยอด</p>
        <button type="button" className="btn-excel !bg-blue-700" onClick={onComeBack}>
          <p className="text-xl">กลับ</p>
        </button>
      </div>

      <Formik
        initialValues={{
          index: "",
          items: convertSummaryDataToItems(dataRowsSummary),
        }}
        onSubmit={(values) => {
          const updatedRows = { ...dataRowsSummary };

          Object.entries(updatedRows).forEach(([key, rows]) => {
            updatedRows[key] = rows.map((row) => {
              const itemCode = row[0];
              const matchItem = values.items.find((item) => item.itemCode === itemCode);

              const newRow = [...row];
              if (matchItem) {
                newRow[3] = Number(matchItem.brought); // ใส่ค่า brought ลง index ที่ 3
                newRow[6] = Number(matchItem.sale); // จะใส่ sale เพิ่มก็ทำได้เลย
              }

              return newRow;
            });
          });

          setDataRowsSummary(updatedRows);
          onComeBack(); // หรือจะคอมเมนต์ไว้ก็ได้
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="pad-main">
            <div className="w-full h-px bg-white !my-6"></div>

            <FieldArray name="items">
              {({ push, remove }) => (
                <div>
                  {values.items.map((item, index) => {
                    const selectedCategory = values.items[index].category;
                    const productOptions = selectedCategory ? DataInner.find((cat) => cat.category === selectedCategory)?.items || [] : DataInner.flatMap((cat) => cat.items);

                    const selectedProduction = values.items[index].itemCode;
                    const filteredCategories = selectedProduction ? DataInner.filter((cat) => cat.items.some((a) => a.code === selectedProduction)) : DataInner.flatMap((cat) => cat);

                    return (
                      <Fragment key={index}>
                        <div className="container-flex">
                          <div className="w-full pad-top-main">
                            <label className="block font-medium">หมวดหมู่</label>
                            <Field
                              as="select"
                              name={`items[${index}].category`}
                              className="text-select"
                              required
                              onChange={(e) => {
                                const selectedCategory = e.target.value;
                                setFieldValue(`items[${index}].category`, selectedCategory);
                                setFieldValue(`items[${index}].itemCode`, "");
                              }}
                            >
                              {!selectedProduction && <option value="">-- เลือก --</option>}
                              {filteredCategories.map((cat) => (
                                <option key={cat.category} value={cat.category}>
                                  {cat.category}
                                </option>
                              ))}
                            </Field>
                          </div>

                          <div className="w-full pad-top-main">
                            <label className="block font-medium">สินค้า</label>
                            <Field
                              as="select"
                              name={`items[${index}].itemCode`}
                              className="text-select"
                              required
                              onChange={(e) => {
                                const selectedItemCode = e.target.value;
                                setFieldValue(`items[${index}].itemCode`, selectedItemCode);

                                const matchedCategory = DataInner.find((cat) => cat.items.some((item) => item.code === selectedItemCode));
                                if (matchedCategory) {
                                  setFieldValue(`items[${index}].category`, matchedCategory.category);
                                }
                              }}
                            >
                              <option value="">-- เลือก --</option>
                              {productOptions.map((prod) => (
                                <option key={prod.code} value={prod.code}>
                                  {prod.code} (฿{prod.price})
                                </option>
                              ))}
                            </Field>
                          </div>

                          <div className="w-full pad-top-main">
                            <label className="block font-medium">ยกมา</label>
                            <Field
                              name={`items[${index}].brought`}
                              className="text-select"
                              required
                              onChange={(e) => {
                                const selectedAmount = e.target.value;
                                setFieldValue(`items[${index}].brought`, selectedAmount);
                              }}
                            />
                          </div>

                          <div className="w-full pad-top-main">
                            <label className="block font-medium">ขาย</label>
                            <Field
                              name={`items[${index}].sale`}
                              className="text-select"
                              required
                              onChange={(e) => {
                                const selectedAmount = e.target.value;
                                setFieldValue(`items[${index}].sale`, selectedAmount);
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 pad-top-main justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              push({ category: "", itemCode: "" });
                            }}
                            className="btn-add"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          {values.items.length > 1 && (
                            <button type="button" onClick={() => remove(index)} className="btn-remove">
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          )}
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              )}
            </FieldArray>

            <div className="flex w-full justify-center pad-button-top-main">
              <button type="submit" className="btn-excel !bg-blue-700">
                บันทึก
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
