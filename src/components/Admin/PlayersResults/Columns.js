import AddExtraResult from "./AddExtraResult"

export const COLUMNS = [
    {
        Header: 'Player',
        accessor: 'playerId',
    }, 
    {
        Header: 'Periodo',
        accessor: 'period',
    }, 
    {
        Header: 'Inversión en producción',
        accessor: 'productionInvestment',
    },
    {
        Header: 'Inversiones financieras',
        accessor: 'finantialInvestment',
    },
    {
        Header: 'Inversión en calidad',
        accessor: 'qualityInvestment',
    },
    {
        Header: 'Total ventas',
        accessor: 'totalSales',
    },
    {
        Header: 'Margen Neto',
        accessor: 'grossProfit',
    },
    {
        Header: 'Resultados Financieros',
        accessor: 'finantialInvestmentResults',
    },
    {
        Header: 'Intereses por préstamos',
        accessor: 'loanInterest',
    },
    {
        Header: 'Impuestos',
        accessor: 'taxes',
    },
    {
        Header: 'Resultados extras',
        accessor: 'extraResults',
    },
    {
        Header: 'Total del período',
        accessor: 'totalPeriod',
    },
    {
        Header: 'Observaciones',
        accessor: 'observations',
    },
    {
        Header: 'Actions',
        accessor: row => { return <AddExtraResult data={row}/> }
    },
]