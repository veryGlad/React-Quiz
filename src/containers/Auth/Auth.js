import React, { useState } from "react";
import classes from "./Auth.module.css";
import Button from "../../components/Ui/Button/Button";
import Input from "../../components/Ui/Input/Input";
import is from "is_js";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";
import { useNavigate } from "react-router-dom";

const initialFormControls = {
  email: {
    value: "",
    type: "email",
    label: "Email",
    errorMessage: "Введите коректный email",
    valid: false,
    touched: false,
    validation: {
      required: true,
      email: true,
    },
  },
  password: {
    value: "",
    type: "password",
    label: "Пароль",
    errorMessage: "Введите коректный пароль",
    valid: false,
    touched: false,
    validation: {
      required: true,
      minLength: 6,
    },
  },
};

const Auth = (props) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formControls, setFormControls] = useState(initialFormControls);
  const navigate = useNavigate();

  const loginHandler = () => {
    props
      .auth(formControls.email.value, formControls.password.value, true)
      .then(() => {
        navigate("/");
      });
  };
  const registerHandler = () => {
    props.auth(formControls.email.value, formControls.password.value, false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  const onChangeHandler = (event, controlName) => {
    const newFormControls = { ...formControls };
    const control = { ...newFormControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    newFormControls[controlName] = control;

    let isFormValid = true;

    Object.keys(newFormControls).forEach((name) => {
      isFormValid = newFormControls[name].valid && isFormValid;
    });

    setFormControls(newFormControls);
    setIsFormValid(isFormValid);
  };

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => onChangeHandler(event, controlName)}
        />
      );
    });
  };

  return (
    <div className={classes.auth}>
      <div>
        <h1>Авторизация</h1>

        <form onSubmit={submitHandler} className={classes.AuthForm}>
          {renderInputs()}

          <Button
            type={"success"}
            onClick={loginHandler}
            disabled={!isFormValid}
          >
            Войти
          </Button>
          <Button
            type={"primary"}
            onClick={registerHandler}
            disabled={!isFormValid}
          >
            Зариегестрироваться
          </Button>
        </form>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) =>
      dispatch(auth(email, password, isLogin)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);
