import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table"
import { COLUMNS } from "./Columns";
import { useSelector, useDispatch } from 'react-redux';
import { GlobalFilter } from "../../GlobalFilter";
import { getMarketLive } from "../../../redux/actions/actions";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import Alert from 'react-bootstrap/Alert';
import { CSVLink } from "react-csv";

export default function AdminMarket () {

    const dispatch = useDispatch()
    const market = useSelector(state => state.marketLive)
    var submit = useSelector(state => state.submit)

    useEffect(() => {
        dispatch(getMarketLive())
    }, [dispatch, submit])

    const data = useMemo(() => market, [market])
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
            } , useGlobalFilter, usePagination)

    const { pageIndex, pageSize, globalFilter } = state 

    if (pageSize === 10) setPageSize(20)

    return (
        <>
        {(market.length === 0) ?
        <Container>
            <Alert variant={"warning"}>No market data yet</Alert>
        </Container>
        :
        <Container>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
        <Table hover={true} {...getTableProps()}>
        
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
            <CSVLink  data={market}><button>Download CSV</button></CSVLink>
        </div>
        </Container>
        }
     </>
    )

}