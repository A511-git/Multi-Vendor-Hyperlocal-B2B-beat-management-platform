export const retry = async (fn, attempts = 3, delay = 300) => {
    let lastError
    if (attempts > 5) attempts = 5
    if (delay > 1000) delay = 500

    if (typeof fn !== "function")
        throw new Error("retry() requires a function as first argument");
    if (typeof attempts !== "number" || typeof delay !== "number")
        throw new Error("retry() requires a number as second (attempts) and third (delay) argument");

    let maxDelay = 1200

    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            return await fn()
        } catch (error) {
            lastError = error

            if (attempt == attempts)
                break
            await new Promise(resolve => setTimeout(resolve, delay))
            delay = delay * 2;
            if (delay > maxDelay) delay = maxDelay;
        }
    }
    throw lastError
}