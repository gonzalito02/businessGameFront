import Quality from "./Quality"
import TotalQuality from "./TotalQuality"

export const COLUMNS = [
    {
        Header: 'Empresa',
        accessor: 'playerId',
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
        accessor: row => { return <Quality data={row}/>}
    },
    {
        Header: 'Precio unitario',
        accessor: 'priceProduct',
    },
    {
        Header: 'Total calidad comprada',
        accessor: row => { return <TotalQuality data={row}/>}
    },
    {
        Header: 'Monto total',
        accessor: 'totalShop',
    }
]