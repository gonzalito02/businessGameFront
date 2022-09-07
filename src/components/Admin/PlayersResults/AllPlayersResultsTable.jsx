import React, { useEffect } from "react";
import { useMemo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table"
import { COLUMNS } from "./Columns";
import { useSelector, useDispatch } from 'react-redux';
import { GlobalFilter } from "../../GlobalFilter";
import { getAllResultsData } from "../../../redux/actions/actions";
import Table from "react-bootstrap/esm/Table";

export default function AllPlayersResultsTable () {

    const dispatch = useDispatch()
    var results = useSelector(state => state.allResultsPlayer)
    var submit = useSelector(state => state.submit)

    useEffect(() => {
        dispatch(getAllResultsData())
    }, [dispatch, submit])

    const data = useMemo(() => results, [results])
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

    if (pageSize === 10) setPageSize(12)

    return (
        <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
        <Table {...getTableProps()}>
        
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

        <div>
            <span>Page{"    "}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{"    "}</span>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button>
        </div>

        </>
    )

}