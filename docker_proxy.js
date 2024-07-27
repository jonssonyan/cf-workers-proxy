export default {
    async fetch(request, env, ctx) {
        try {

        } catch (error) {
            console.log('Fetch error:', error);
            return new Response('Internal Server Error', {status: 500});
        }
    }
}

const routes = {

}