import { getPollByCategory } from "../../../db";

export async function GET({ params }) {
    const { category } = params;
    const polls = await getPollByCategory(category);

    if (JSON.stringify(polls) === "[]") {
        return new Response(null, {
            status: 404,
            statusText: 'Not found'
        });
    }

    return new Response(
        JSON.stringify(polls), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}