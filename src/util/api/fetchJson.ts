export const fetchJson = async <T>(url: string): Promise<T> => await fetch(url).then(async response => await response.json().then((data: T) => data))
