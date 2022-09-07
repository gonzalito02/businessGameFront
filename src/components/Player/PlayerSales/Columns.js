export const COLUMNS = [
    {
        Header: 'Empresa',
        accessor: 'playerId',
    }, 
    {
        Header: 'Fecha de venta',
        accessor: row => { return row.createdAt? row.createdAt.slice(0,10) : null}
    },
    {
        Header: 'Cliente',
        accessor: row => { return row.studentId? (row.studentId * 3).toString().slice(3) : null}
    },
    {
        Header: 'Periodo',
        accessor: 'period',
    }, 
    {
        Header: 'Producto',
        accessor: 'typeProduct',
    },
    {
        Header: 'Cantidad',
        accessor: 'stockProduct',
    },
    {
        Header: 'Calidad del producto',
        accessor: 'qualityProduct',
    },
    {
        Header: 'Precio unitario',
        accessor: 'priceProduct',
    },
    {
        Header: 'Total calidad comprada',
        accessor: 'totalQuality',
    },
    {
        Header: 'Monto total',
        accessor: 'totalShop',
    }
]