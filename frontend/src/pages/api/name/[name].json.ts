import { getPollByName } from "../../../db";

// @ts-expect-error
export async function GET({ params }) {
    const { name } = params;
    const poll = await getPollByName(name);

    if (JSON.stringify(poll) === "[]") {
        return new Response(null, {
            status: 404,
            statusText: 'Not found'
        });
    }

    return new Response(
        JSON.stringify(poll), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}