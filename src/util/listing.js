export const formatDate = (date) => {
    date = new Date(date);
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}