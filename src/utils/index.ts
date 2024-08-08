export const formatDate = (isoString: string): string => {
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('es-ES', {
        day: "numeric",
        year: "numeric",
        month: "long"
    }).format(date)
    return formatter
}