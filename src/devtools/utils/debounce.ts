
function debounce<T extends (...args: any[]) => void>(
    func: T, timeoutMs: number
): (...args: Parameters<T>) => void {

    let timeoutId: ReturnType<typeof setTimeout> | null = null

    return (...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => func(...args), timeoutMs)
    }
}

export {
    debounce
}
