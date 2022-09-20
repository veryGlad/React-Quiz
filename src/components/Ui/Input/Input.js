import React from "react";
import classes from "./Input.module.css"


function isInvalid(valid, touched, shouldValidate) {
    return !valid && shouldValidate && touched
}

const Input = ({valid, touched, shouldValidate, type, errorMessage, label, onChange, value}) => {
    const inputType = type || "text"
    const cls = [classes.input]
    const htmlFor = `${inputType}-${Math.random()}`

    if (isInvalid(valid, touched, shouldValidate)) {
        cls.push(classes.invalid)
    }

    return (
        <div className={cls.join(" ")}>
            <label htmlFor={htmlFor}>{label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={value}
                onChange={onChange}
            />

            {
                isInvalid(valid, touched, shouldValidate)
                    ? <span>{errorMessage || "Введите верное значение"}</span>
                    : null

            }
        </div>
    )
}

export default Input