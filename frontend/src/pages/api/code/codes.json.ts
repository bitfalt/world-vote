import { getExistingCodes} from "../../../db";

// @ts-expect-error
export async function GET({ params }) {
    const { code } = params;
    const poll = await getExistingCodes();

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
};