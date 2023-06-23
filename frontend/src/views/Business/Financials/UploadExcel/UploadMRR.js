import React from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import API from "../../../../util/AxiosConfig";
import { history } from "../../../../util/history";

function UploadMRR() {
  const [data, setData] = React.useState([]);
  const [cols, setCols] = React.useState([]);

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      /* Parse data */
      const ab = e.target.result;
      const wb = XLSX.read(ab, { type: "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {
        header: 1,
        blankrows: false,
      });

      /* Update state */
      setData(data);
      setCols(make_cols(ws["!ref"]));
    };
    reader.readAsArrayBuffer(file);
  };

  const exportFile = () => {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx");
  };

  return (
    <DragDropFile handleFile={handleFile}>
      <div className="row">
        <div className="col-xs-12">
          <DataInput handleFile={handleFile} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <OutTable data={data} cols={cols} />
        </div>
      </div>
    </DragDropFile>
  );
}
export default UploadMRR;

/* -------------------------------------------------------------------------- */

/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/

function DragDropFile({ handleFile, children }) {
  const suppress = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) handleFile(files[0]);
  };

  return (
    <div onDrop={handleDrop} onDragEnter={suppress} onDragOver={suppress}>
      {children}
    </div>
  );
}

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/

function DataInput({ handleFile }) {
  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) handleFile(files[0]);
  };

  return (
    <form className="form-inline">
      <div className="form-group">
        <label htmlFor="file">Drag or choose a spreadsheet file</label>
        <br />
        <input
          type="file"
          className="form-control"
          id="file"
          accept={SheetJSFT}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}

/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
function OutTable({ data, cols }) {
  const [activeHeader, setActiveHeader] = React.useState([]);
  const [showError, setShowError] = useState(false);
  const user = useSelector((state) => state.authentication.user);

  const addItem = (key) => {
    if (activeHeader.length == 2 && activeHeader?.some((r) => r == key)) {
      setActiveHeader(activeHeader.filter((item) => item !== key));
    } else if (activeHeader.length < 2) {
      setActiveHeader((oldArray) => [...oldArray, key]);
    }
  };

  const submitData = async () => {
    const monthRegex =
      /^(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)$/i;
    const pattern = /month/gi;
    let fail = false;
    function arrayEquals(a, b) {
      return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      );
    }
    const newArr = [...data];
    newArr.shift();

    const months = pattern.test(data[0][activeHeader[0]])
      ? newArr.map((item) => item[activeHeader[0]])
      : pattern.test(data[0][activeHeader[1]])
      ? newArr.map((item) => item[activeHeader[1]])
      : setShowError(true);
    if (!months) fail = true;

    if (fail) return;

    const values = arrayEquals(
      months,
      newArr.map((item) => item[activeHeader[1]])
    )
      ? newArr.map((item) => item[activeHeader[0]])
      : newArr.map((item) => item[activeHeader[1]]);

    months?.map((month) => {
      if (month.match(monthRegex) || [].length > 0) {
      } else {
        setShowError(true);
        return;
      }
    });

    values.map((item) => {
      if (typeof item == "number") {
      } else {
        setShowError(true);
        return;
      }
    });

    if (fail) {
      return;
    } else {
      const arr = newArr.map(function (item, i) {
        return { month: months[i], amount: values[i], user_id: user?.user_id };
      });

      await API.post("/mrr", { body: arr });
      history.push(`/business/app/company/${user?.user_id}/financials`);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-xs-12">
          <p>Choose the month and data field.</p>
          <button
            disabled={activeHeader.length == 2 ? false : true}
            onClick={submitData}
            className="btn btn-success"
          >
            Upload
          </button>
        </div>
        {showError ? (
          <Alert
            className="mt-5"
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
          >
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              You have either not choosen a column with valid months, or the
              data column is not numbers. Try checking your choosen fields and
              try again.
            </p>
          </Alert>
        ) : null}
      </div>

      <div className="table-responsive mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              {cols.map((c) => (
                <th
                  onClick={() => addItem(c.key)}
                  className={`columnHeader ${
                    activeHeader?.some((r) => r == c.key) ? "activeColumn" : ""
                  }`}
                  key={c.key}
                >
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={i}>
                {cols.map((c) => (
                  <td
                    key={c.key}
                    className={`columnHeader ${
                      activeHeader?.some((r) => r == c.key)
                        ? "activeColumn"
                        : ""
                    }`}
                  >
                    {r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* list of supported file types */
const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm",
]
  .map((x) => `.${x}`)
  .join(",");

/* generate an array of column objects */
const make_cols = (refstr) => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};
