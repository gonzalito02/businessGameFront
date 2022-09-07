import UpdatePlayer from "./UpdatePlayer"

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
        Header: 'Miembros',
        accessor: row => { return row.members ?  
        row.members.map(m => {return (<span key={m}>{m}{"; "}</span>)})
        :
        "none"
        }
    },
    {
        Header: 'Grupo',
        accessor: 'group',
    },
    {
        Header: 'Capital Inicial',
        accessor: "initialCapital"
    },
    {
        Header: 'Index',
        accessor: 'index',
    },  
    {
        Header: 'Allow Play',
        accessor: row => { return row.allowToPlay? "Allowed" : "Not allowed"}
    },    
    {
        Header: 'Actions',
        accessor: row => { return <UpdatePlayer data={row}/> }
    },

]