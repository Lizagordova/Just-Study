export function formatDate(dateStr: string) {
    let date = new Date(dateStr);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return day + '-' + month + '-' + year;
}