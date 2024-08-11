import { XataClient } from "./xata";

function createXataClient() {
    const xata = new XataClient({
        apiKey: import.meta.env.XATA_API_KEY,
        branch: import.meta.env.XATA_BRANCH
    })

    return xata;
}

export async function getPollByCategory(category: string) {
    const xata = createXataClient();

    const polls = await xata.db.Polls.filter({
        "category.name": category,
    }).getAll();

    return polls;
};

export async function getPollByName(name: string) {
    const xata = createXataClient();

    const poll = await xata.db.Polls.filter({
        name: name,
    }).getFirst();

    return poll;
};

export async function getPollAddressByCode(code: number) {
    const xata = createXataClient();

    const address = await xata.db.Polls
    .select([
        'smartContractAddress'
    ]).filter({
        pollCode: Number(code)
    }).getFirst();

    return address;
};
