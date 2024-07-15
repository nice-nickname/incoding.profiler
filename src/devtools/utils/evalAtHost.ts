
export function evalAtHost(code: string): Promise<unknown> {
    return new Promise<unknown>(
        (resolve, reject) => {
            chrome.devtools.inspectedWindow.eval(code, function (res, err) {
                if (err.isError || err.isException) {
                    reject(err)
                    return
                }

                resolve(res)
            })
        })
}

export async function inspectHostElement(profilerId: string) {
    const element = `$('[data-profiler-id="${profilerId}"]')[0]`

    await evalAtHost(`inspect(${element})`)
}
