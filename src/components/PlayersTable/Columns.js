export const COLUMNS = [
    {
        Header: 'Id',
        accessor: 'id',
    }, 
    {
        Header: 'Empresa',
        accessor: 'officialName',
    }, 
    {
        Header: 'Nombre de Fantasía',
        accessor: row => { return row.fantasyName === null ? "None" : row.fantasyName}
    },
    {
        Header: 'Grupo',
        accessor: 'group',
    },
    {
        Header: 'Miembros',
        //acccesor: "members"
        accessor: row => { return row.members ?  
        row.members.map(m => {return (<span key={m}>{m}{"; "}</span>)})
        :
        "none"
        }
    },
    {
        Header: 'Capital Inicial',
        accessor: row => { return `$ ${row.initialCapital}`}
    },
    {
        Header: 'Index',
        accessor: 'index',
    }
]