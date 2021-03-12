import { getFileName } from "./getFileName";
import React from "react";
import { CardImg, Alert } from "reactstrap";

export function renderContent(path: string) {
    path = path.replace('client/build', './').toLowerCase();
    if(path.includes("jpg") || path.includes("jpeg") || path.includes("png")) {
        return (
            <CardImg src={path} alt="Loading..."/>
        );
    } else if(path.includes("doc") || path.includes("docx")) {
        let fileName = getFileName(path);
        return (
            <a href={path} type="application/vnd.openxmlformats-officedocument.wordprocessingml.document" target="_blank">{fileName}</a>
        );
    } else if(path.includes("mp3")) {
        let fileName = getFileName(path);
        return (
            <audio className="audio" controls>
                <source src={path} type="audio/mpeg"/>
            </audio>
        );
    } else if(path.includes("mp4")) {
        return (
            <>
                <iframe src={path} className="materialContent" />
            </>
        );
    } else if(path.includes("mov")) {
        return (
            <video controls={true} width="800" height="600" src={path}/>
        );
    } else {
        return (
            <Alert color="secondary">
                Формат задания не поддерживается
            </Alert>
        )
    }
}