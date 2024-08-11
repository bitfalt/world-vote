import { getCategories } from "../../../db";

export async function GET({}) {
    const categories = await getCategories();

    if (JSON.stringify(categories) === "[]") {
        return new Response(null, {
            status: 404,
            statusText: 'Not found'
        });
    }

    return new Response(
        JSON.stringify(categories), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}