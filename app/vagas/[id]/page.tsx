export default async function PaginaDaVaga({params}: {params: Promise<{ id: string }>}) {
    const {id} = await params;

    return <h1>Vaga {id}</h1>
}