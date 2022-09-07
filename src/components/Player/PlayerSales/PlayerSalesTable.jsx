import React, { useEffect } from "react";
import { useMemo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table"
import { COLUMNS } from "./Columns";
import { useSelector, useDispatch } from 'react-redux';
import { GlobalFilter } from "../../GlobalFilter";
import { getShopRegPlayerById } from "../../../redux/actions/actions";
import Table from "react-bootstrap/esm/Table";
import Container from "react-bootstrap/esm/Container";
import Alert from 'react-bootstrap/Alert';

export default function PlayerSalesTable () {

    const dispatch = useDispatch()
    var results = useSelector(state => state.shoppingRegister)
    var loginUser = useSelector(state => state.userLogin)

    const idt = loginUser.id

    useEffect(() => {
        if (loginUser) dispatch(getShopRegPlayerById(idt))
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

    if (pageSize === 10) setPageSize(20)



    return (
        <>
        <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>Sales</h2>
        <Container> 
        {(results.length === 0)?
        <Alert variant={"warning"}>No sales yet</Alert>
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