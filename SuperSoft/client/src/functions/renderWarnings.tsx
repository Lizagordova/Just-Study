import { WarningType } from "../consts/WarningType";
import { Fade } from "reactstrap";
import React from "react";

export function renderWarning(type: WarningType) {
    if(type === WarningType.EndDateLessThanStartDate) {
        return (
            <Fade className="warning">
                Дата окончания не может быть меньше даты начала
            </Fade>
        );
    } else if(type === WarningType.StartDateMoreThanEndDate) {
        return (
            <Fade className="warning">
                Дата начала не может быть больше даты окончания
            </Fade>
        );
    } else if(type === WarningType.ChoosenDateLessThanToday) {
        return (
            <Fade className="warning">
                Выбранная дата не может быть меньше сегодняшней даты
            </Fade>
        );
    } else if(type === WarningType.NotValid) {
        return (
            <Fade className="warning"
                  style={{fontSize: "1.2em", textAlign: "center"}}>
                Урок пока не может быть сохранён, устраните ошибки
            </Fade>
        );
    }    
}