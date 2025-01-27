import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }`

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
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
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                console.log("index of the row...", i);
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

function genericColumnGen(input) {
    let requiredColumn = [];
    if (Array.isArray(input)) {
        let keys = Object.keys(input[0]);
        for (let i = 0; i < keys.length; i++) {
            let x = keys[i].split("_");
            let a = x[0];
            let b = x[1];
            requiredColumn.push({ Header: `${b}`, accessor: `${keys[i]}` })
            // requiredColumn.push({ Header: `${keys[i]}`, accessor: `${keys[i]}` })
        }
        return requiredColumn;
    }
}

//to get the selected rowid from the application...
const onRowClick = (cellInfo) => {
    const { row } = cellInfo;
    console.log('It was in this cellInfo instance:', row);
    console.log('It was in this cellInfo instance:', row.original);
}


function App() {

    const data = [{
        user_name: 'Roy Agasthyan',
        user_age: 26
    }, {
        user_name: 'Sam Thomason',
        user_age: 22
    }, {
        user_name: 'Michael Jackson',
        user_age: 36
    }, {
        user_name: 'Samuel Roy',
        user_age: 56
    }, {
        user_name: 'Rima Soy',
        user_age: 28
    }, {
        user_name: 'Suzi Eliamma',
        user_age: 28
    }]

    const columns = [{
        Header: 'user_name',
        accessor: 'user_name'
    }, {
        Header: 'user_age',
        accessor: 'user_age'
    }, {
        Header: "Edit Operation",
        Cell: cellInfo => (
            <button value={cellInfo.row} onClick={() => { onRowClick(cellInfo) }}>
                EditButton...
            </button>
        )
    }]

    // const columns = genericColumnGen(data);
    console.log("columns...", columns);
    return (
        <div>
            <Styles >
                <Table
                    data={data}
                    columns={columns}
                />
            </Styles>
        </div>
    )


}

export default App;