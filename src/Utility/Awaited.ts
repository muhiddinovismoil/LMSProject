type AsyncData = Promise<string>

type ResolvedData = Awaited<AsyncData>
// type ResolvedData = string;

async function fetchData(): AsyncData {
    return 'data'
}

async function processData() {
    const data: ResolvedData = await fetchData()
    console.log(data) // data
}

processData()
