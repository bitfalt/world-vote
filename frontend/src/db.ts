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

export async function getPollInformation(name: string) {
    const xata = createXataClient();

    const poll = await xata.db.Polls
    .select([
        'name',
        'category',
        'smartContractAddress',        
    ]).filter({
        name: name
    }).getFirst();

    return poll;
};

export async function getCategories() {
    const xata = createXataClient();

    const categories = await xata.db.Category.getAll();

    return categories;
};

export async function getExistingCodes(code: number) {
    const xata = createXataClient();

    const codes = await xata.db.Polls.filter({
        private: { $isNot: 0 }
    }).select(["pollCode"]).getAll();

    return codes;
}
