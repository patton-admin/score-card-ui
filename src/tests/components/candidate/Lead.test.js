import { shallow } from "enzyme";
import React from "react";
import Lead from "./../../../components/candidate/Lead";
import { Provider } from "react-redux";
import configureStore from "./../../../store/configureStore";

const store = configureStore();
test(`testing the rendering of Lead Component`, () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Lead />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
  //since the component is wrapped inside the shallow it will render only the Lead component alone... so you will not be able to test the values inside Lead..
  expect(wrapper.find("Lead").length).toBe(1);
});
