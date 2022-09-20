import React from "react";
import classes from "./FinishedQuiz.module.css";
import Button from "../Ui/Button/Button";
import {Link} from "react-router-dom";

const FinishedQuiz = props => {
    const successCount = Object.keys(props.resuelts).reduce((total, key) => {
        if (props.resuelts[key] === "success") {
            total++
        }

        return total
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                { props.quiz.map((quizItem, index) => {

                    const cls = [
                        "fa",
                        props.resuelts[quizItem.id] === "error" ? "fa fa-times" : "fa fa-check",
                        classes [props.resuelts[quizItem.id]]
                    ]

                    return (
                        <li
                            key={index}
                        >
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(" ")} />
                        </li>
                    )

                }) }
            </ul>

            <p>Праивльно {successCount } из {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type='primary'>Повторить</Button>
                <Link to={"/"}>
                    <Button type='success'>Перейти в список тестов</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz