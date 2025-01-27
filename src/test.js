import React from "react";
import { render } from "react-dom";
import { Formik, Field } from "formik";
import CheckBox from './../src/components/bucket/CheckBox';

function App() {
    return (
        <Formik
            initialValues={{
                roles: ["1","2","3"]
            }}
            onSubmit={values => alert(JSON.stringify(values, null, 2))}
        >
            {formik => (
                <div>
                    <div>
                        <CheckBox name="roles" value="1" />
                        <CheckBox name="roles" value="2" />
                        <CheckBox name="roles" value="3" />
                        <CheckBox name="roles" value="4" />
                        <CheckBox name="roles" value="5" />
                        <CheckBox name="roles" value="6" />
                    </div>
                    <button onClick={formik.submitForm}>submit</button>
                    <pre>{JSON.stringify(formik.values, null, 2)}</pre>
                </div>
            )}
        </Formik>
    );
}


export default App;
