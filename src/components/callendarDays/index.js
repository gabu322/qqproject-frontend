import React from "react";

const CallendarDays = (props) => {

    return (
        <div className={'dateCard shadow-3 ' + (props.index === props.currentMonth - 1 ? '' : 'disabled')}>{props.i == 1 ? props.monthName : props.i}</div>
    )
}

export default CallendarDays;
