export const retry = async (fn, attempts = 3, delay = 300) => {
    let lastError;

    if (attempts > 15) attempts = 15;
    if (delay < 500) delay = 500;  

    const maxDelay = 5000; 

    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            console.log(`Attempt ${attempt}/${attempts}: ${error.message}`);

            if (attempt === attempts) break;

            await new Promise(res => setTimeout(res, delay));

            delay = Math.min(delay * 2, maxDelay); // exponential and capped
        }
    }

    throw lastError;
};
