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
        Header: 'Creation date',
        accessor: row => { return row.createdAt? row.createdAt.slice(0,10) : null}
    },
    {
        Header: 'Prices',
        accessor: row => { return row.qualityInvestment? 
            <ul>
                <li>A: {row.priceA}</li>
                <li>B: {row.priceB}</li>
                <li>C: {row.priceC}</li>
            </ul> : null}
    },
    {
        Header: 'Quantities',
        accessor: row => { return row.qualityInvestment? 
            <ul>
                <li>A: {row.quantityA}</li>
                <li>B: {row.quantityB}</li>
                <li>C: {row.quantityC}</li>
            </ul> : null}
    },
    {
        Header: 'Quality',
        accessor: row => { return row.qualityInvestment? 
            <ul>
                <li>A: {row.qualityA}</li>
                <li>B: {row.qualityB}</li>
                <li>C: {row.qualityC}</li>
            </ul> : null}
    },
    {
        Header: 'Investment',
        accessor: row => { return row.productionInvestment? 
            <ul>
                <li>Production: {row.productionInvestment}</li>
                <li>Finantial: {row.finantialInvestment}</li>
                <li>Quality: {row.qualityInvestment}</li>
            </ul> : null}
    },
    {
        Header: 'FinantialFixedInvestment',
        accessor: row => { return row.qualityInvestment? 
            <ul>
                <li>finFixedInvestment: {row.finantialFixedInvestment}</li>
                <li>finFixedRentability: {row.finantialFixedRentability}</li>
            </ul> : null}
    },
    {
        Header: 'Dinamic Form',
        accessor: row => { return (row.type === "investment" || row.type === "loan")? 
            <ul>
                <li>Type: {row.type}</li>
                <li>Amount: {row.amount}</li>
                <li>Rate: {row.rate}</li>
                <li>{(row.type === "loan")? `Clearing ${row.clearingPeriod}`: ""}</li>
            </ul> : null}
    },
    {
        Header: 'Description',
        accessor: row => { return row.description? 
                <span>Description: {row.description}</span>: 
            null}
    },
    {
        Header: 'Status',
        accessor: row => { return (row.status === false)? 
                <span>Abierta</span>
             : <span>Cerrada</span>}
    },
    {
        Header: 'Validado por Admin',
        accessor: row => { return row.createdAt? (row.validateByAdmin === 1 ? "Passed"
                                                                            : row.validateByAdmin === 2 ? "Denegated" 
                                                                            : "Pending") : null
                        }
    }
]