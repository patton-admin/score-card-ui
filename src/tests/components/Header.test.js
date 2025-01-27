import { shallow } from "enzyme";
import React from "react";
import Header from "./../../components/Header";

test(`testing the rendering of Header Component`, () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("div").length).toBe(1);
});
