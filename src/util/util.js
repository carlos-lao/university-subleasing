export const convertToAWSDate = (date) => {
    return date.toISOString().slice(0, 10) + 'Z'
}