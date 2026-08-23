export default async function Vaga({params}: {params: Promise<{ id: string }>}) {
    const {id} = await params;

    return <h1>Vaga {id}</h1>
}