import React, { useEffect } from "react";
import { useMemo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table"
import { COLUMNS } from "./Columns";
import { useSelector, useDispatch } from 'react-redux';
import { GlobalFilter } from "../../GlobalFilter";
import { getResultsPlayerById } from "../../../redux/actions/actions";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import Alert from 'react-bootstrap/Alert';

export default function PlayerResultsTable () {

    const dispatch = useDispatch()
    var results = useSelector(state => state.resultsPlayerId)
    var loginUser = useSelector(state => state.userLogin)

    useEffect(() => {
        if (loginUser) dispatch(getResultsPlayerById(loginUser.id))
    }, [dispatch, loginUser])

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
        <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>Results</h2>
        <Container> 
        {(results.length === 0)?
        <Alert variant={"warning"}>No results yet</Alert>
        :
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
        }
        </Container>
        </>
    )

}