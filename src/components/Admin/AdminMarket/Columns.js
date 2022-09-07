import UpdateMarketRow from "./UpdateMarketRow"

export const COLUMNS = [
    {
        Header: 'PlayerID',
        accessor: 'playerId',
    }, 
    {
        Header: 'Period',
        accessor: 'period',
    }, 
    {
        Header: 'Empresa',
        accessor: row => { return row.fantasyName? row.fantasyName : row.officialName}
    },
    {
        Header: 'Producto',
        accessor: 'typeProduct'
    },
    {
        Header: 'Quality',
        accessor: 'qualityProduct'
    },
    {
        Header: 'Stock',
        accessor: 'stockProduct'
    },
    {
        Header: 'Precio',
        accessor: row => { return row.priceProduct? (`$ ${row.priceProduct}`) : null}
    },
    {
        Header: 'Actions',
        accessor: row => { return <UpdateMarketRow data={row}/> }
    },
]