import React from "react";
import { Formik, Field } from "formik";

function CheckBox(props) {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label>
          <input
            type="checkbox"
            style={{ cursor: "pointer" }}
            {...props}
            checked={
              field.value !== undefined ? field.value.includes(props.value) : ""
            }
            onChange={() => {
              if (
                field.value !== undefined &&
                field.value.includes(props.value)
              ) {
                const nextValue = field.value.filter(
                  (value) => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                field.value = field.value === undefined ? [] : field.value;
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
          {"  "}
          {props.label}
        </label>
      )}
    </Field>
  );
}

export default CheckBox;
