export function getFileName(path: string): string {
    let pathParts = path.split("/");
    let fileName = "";
    if(pathParts.length > 0) {
        fileName = pathParts[pathParts.length - 1];
    } else {
        fileName = path;
    }

    return fileName;
}