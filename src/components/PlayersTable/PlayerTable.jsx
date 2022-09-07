import React, { useEffect } from "react";
import { useMemo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table"
import { getAllPlayers, getAllStudents } from "../../redux/actions/actions";
import { COLUMNS } from "./Columns";
import { useSelector, useDispatch } from 'react-redux';
import Table from "react-bootstrap/Table"
import { CSVLink } from "react-csv"
import Container from "react-bootstrap/esm/Container";

export default function PlayerTable () {

    const dispatch = useDispatch()
    const players = useSelector(state => state.allPlayers)

    useEffect(() => {
        dispatch(getAllPlayers())
        dispatch(getAllStudents())
    }, [dispatch])

    const data = useMemo(() => players.filter(e => e.id !== 1111), [players])
    const columns = useMemo(() => COLUMNS, [])

    const { getTableProps,
            getTableBodyProps,
            headerGroups,
            page,
            nextPage,
            previousPage,
            canNextPage,
            canPreviousPage,
            pageOptions,
            gotoPage,
            pageCount,
            setPageSize,
            state,
            setGlobalFilter,
            prepareRow } = useTable({
                columns,
                data
            }, useGlobalFilter, usePagination)


    const { pageIndex, pageSize, globalFilter } = state 

    if (pageSize === 10) setPageSize(20)

    return (
        <>

            <Table striped responsive {...getTableProps()}>
        
            <thead>
                {
                    headerGroups.map(hg =>                        
                    <tr {...hg.getHeaderGroupProps}>
                        {
                            hg.headers.map( column =>       
                                <th {...column.getHeaderProps}>{column.render("Header")}</th>
                            )
                        }
                    </tr>                    
                    )
                }
            </thead>

            <tbody {...getTableBodyProps()}>
                {
                    page.map((row) => {
                        prepareRow(row);
                        return (
   
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map( (cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }  
                            </tr>

                        )
                    })
                }

            </tbody>

            </Table>

            <Container>
                <span>Page{"    "}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{"    "}</span>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button> 
                <CSVLink  data={players}><button>Download CSV</button></CSVLink>
            </Container>
        </>
    )

}