
export async function isIncodingFrameworkExistsOnHostPage(): Promise<boolean> {
    try {
        const name = await evalAtHost<string>('ExecutableBase.name')
        return name === 'ExecutableBase'
    } catch {
        return false
    }
}

export function evalAtHost<T = unknown>(code: string): Promise<T> {
    return new Promise<T>(
        (resolve, reject) => {
            chrome.devtools.inspectedWindow.eval(code, function (res, err) {
                if (err) {
                    return reject(err)
                }

                resolve(res as T)
            })
        })
}

export async function inspectHostElement(profilerId: string) {
    const element = `$('[data-profiler-id="${profilerId}"]')[0]`

    await evalAtHost(`inspect(${element})`)
}
