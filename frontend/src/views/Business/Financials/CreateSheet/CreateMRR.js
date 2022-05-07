import React,{useState} from 'react'
import { useTable, usePagination } from 'react-table'
import BTable from 'react-bootstrap/Table'
import { BsTrash } from 'react-icons/bs'
import { Alert, Button, Modal } from 'react-bootstrap'
import { BsChevronRight,BsChevronLeft } from 'react-icons/bs'
import { BsChevronDoubleRight,BsChevronDoubleLeft } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import API from '../../../../util/AxiosConfig'
import { history } from '../../../../util/history'
import CurrencyInput from 'react-currency-input-field'

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = value => {
    console.log(value);
  if(!isNaN(value)){
    console.log("setting to number");
    var integer = parseInt(value, 10);
    console.log(integer);
    setValue(integer);

  }
  else{
    console.log("setting to string");
  setValue(value)
  }
}

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return id == 'amount' ? <CurrencyInput
  id="input-example"
  prefix="$"
  name="input-name"
  placeholder="Please enter a number"
  defaultValue={value}
  decimalsLimit={2}
  onValueChange={(value,name) => onChange(value)}
/> : <input value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}

// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset,failedColumns,setFailedColumns}) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      <BTable striped bordered hover  {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <>
               <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td onChange={() => setFailedColumns(failedColumns.filter(item => item !== cell.value))} className={`${failedColumns?.some(r => r == cell.value) ? "error" : ""}`}  {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
              </>
            )
          })}
        </tbody>
      </BTable>
      <div className="pagination">
        
        <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        <BsChevronDoubleLeft/>
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        <BsChevronLeft/>
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
        <BsChevronRight/>
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        <BsChevronDoubleRight/>
        </button>{' '}
        </div>

        <div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        </div>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

function CreateMRR() {
  const [failedColumns,setFailedColumns] = useState([]); 
  const [data, setData] = React.useState([
    {
      "month": "March",
      "amount": 0,
    },
    {
      "month": "January",
      "amount": 1189098750,
    },
    {
      "month": "February",
      "amount": 1154359412.5,
    },
    {
      "month": "August",
      "amount": 1120755617.625,
    },
    {
      "month": "July",
      "amount": 1088262635.3462498,
    },
    {
      "month": "August",
      "amount": 1056857411.1608623,
    },
    {
      "month": "June",
      "amount": 1026518609.1885363,
    },
    {
      "month": "December",
      "amount": 997226663.3116302,
    },
    {
      "month": "May",
      "amount": 968963837.0509063,
    },
    {
      "month": "March",
      "amount": 941714292.9418665,
    },
    {
      "month": "January",
      "amount": 915464172.2563468,
    },
    {
      "month": "February",
      "amount": 890201686.0016662,
    },
    {
      "month": "September",
      "amount": 865917218.2259269,
    },
    {
      "month": "July",
      "amount": 842603442.7638911,
    },
    {
      "month": "September",
      "amount": 820255454.6741905,
    },
    {
      "month": "June",
      "amount": 798870917.7465024,
    },
    {
      "month": "January",
      "amount": 778450229.5978988,
    },
    {
      "month": "May",
      "amount": 758996706.0321327,
    },
    {
      "month": "March",
      "amount": 740516786.5055565,
    },
    {
      "month": "January",
      "amount": 723020262.7302163,
    },
    {
      "month": "February",
      "amount": 706520532.650119,
    },
    {
      "month": "October",
      "amount": 691034882.2526054,
    },
    {
      "month": "July",
      "amount": 676584797.9252164,
    },
    {
      "month": "October",
      "amount": 663196312.341668,
    }
  ])



  const columns = React.useMemo(
    () => [
          {
            Header: 'Month',
            accessor: 'month',
          },
          {
            Header: 'Monthly Reccuring Revenue',
            accessor: 'amount',
          },
          {
            Header: 'Delete',
            accessor: (str) => 'delete',
            Cell: (tableProps) => (
              <span style={{cursor:'pointer'}}
                onClick={() => {
                  // ES6 Syntax use the rvalue if your data is an array.
                  const dataCopy = [...data];
                  // It should not matter what you name tableProps. It made the most sense to me.
                  dataCopy.splice(tableProps.row.index, 1);
                  setData(dataCopy);
                }}>
               <BsTrash/>
              </span>
            ),
          },
    ],  
    [data]
  )

  
  const addError = (value) => {
		setFailedColumns(oldArray => [...oldArray, value]);
  }

  const [originalData] = React.useState(data)
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false)
  }, [data])
  const user = useSelector(state => state.authentication.user);
  const [showError, setShowError] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...

  return (
    <>
	{showError ? (
		<Alert variant="danger" onClose={() => setShowError(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          You have either not choosen a column with valid months, or the data column is not numbers. Try checking your choosen fields and try again.
        </p>
      </Alert>
	): null}

<div style={{width:335,display:'flex',justifyContent:'space-evenly'}}>
<Button disabled={data.length > 0 ? false:true} onClick={async() => {
const monthRegex = /^(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)$/i
setFailedColumns([]);
let fail = false;
const arr = data.map(obj=> ({ ...obj, user_id: user?.user_id }))

arr.map((obj,i) => {
		if(obj.month.match(monthRegex) || [].length > 0){
			console.log("true")
		} 
		else{
			console.log("fejl " + i, obj.month );
			setShowError(true);
      addError(obj.month);
      fail = true;
			return
		}


    if(typeof obj.amount == 'number'){
			console.log("det er en gyldig værdi");
		}

		else{
		console.log("fejl",obj.amount + typeof obj.amount);
    addError(obj.amount);
    fail = true;
		setShowError(true);
		return
		}
	})

  if(fail){
    console.log("der er fejl");
  }
  else{
    await API.post('/mrr',{'body': arr});
    history.push(`/business/app/company/${user?.user_id}/financials`)
    setShowError(false);
  }
                }}>
               Submit data
    </Button>

    

    <Button
                onClick={() => {
                  setData([])
                }}>
               Reset
    </Button>

    <Button
                onClick={() => {
                  const dataCopy = [...data, {"month": '', "amount": 0}];
                  setData(dataCopy);
                }}>
               Add row
    </Button>
</div>

      <Table
        columns={columns}
        data={data}
        failedColumns={failedColumns}
        setFailedColumns={setFailedColumns}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </>
      
  )
}

export default CreateMRR
