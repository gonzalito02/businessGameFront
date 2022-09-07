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
        Header: 'Precio',
        accessor: row => { return row.priceProduct? (`$ ${row.priceProduct}`) : null}
    },
    {
        Header: 'Stock',
        accessor: 'stockProduct'
    },
]