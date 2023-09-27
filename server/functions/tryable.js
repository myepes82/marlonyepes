
function noneAsync(asyncFunction) {
    return new Promise( async (resolve, reject) => {
        try {
            const result = await asyncFunction()
            resolve(result)
        } catch (error) {
            reject(error)
        }
    }).then(e => e).catch(e => {throw e})
}

function tryable(f){
    if(typeof f !== "function") return;
    const name = f.name;
    const isAsync = f.constructor.name === "AsyncFunction";
    try {
        console.log(`[${name}] Starting execution`)
        if(isAsync) {
            noneAsync(f)
            return;
        }
        f();
        return;
    } catch (error) {
        console.error(`[${name}] Execution error: ${error}`)
    } finally{
        console.info(`[${name}] Execution finishied`)
    }
}


module.exports = {
    tryable
}