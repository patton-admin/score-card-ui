import { shallow } from "enzyme";
import React from "react";
import { AppRouters } from "./../../routers/AppRouters";

test(`testing the AppRouter when IsLoggedIn is not passed`, () => {
  const wrapper = shallow(<AppRouters />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("Router").length).toBe(1);
  expect(wrapper.find("div").length).toBe(1);
  expect(wrapper.find("Switch").length).toBe(1);
  expect(wrapper.find("Route").length).toBe(1);
});

test(`testing the AppRouter No User loggedin is false`, () => {
  const wrapper = shallow(<AppRouters isLoggedIn={false} />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("Router").length).toBe(1);
  expect(wrapper.find("div").length).toBe(1);
  expect(wrapper.find("Switch").length).toBe(1);
  expect(wrapper.find("Route").length).toBe(1);
});

test(`testing the AppRouter for Admin/Users view is true`, () => {
  const wrapper = shallow(<AppRouters isLoggedIn={true} />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("Router").length).toBe(1);
  expect(wrapper.find("div").length).toBe(1);
  expect(wrapper.find("Switch").length).toBe(1);
  expect(wrapper.find("Route").length).toBe(8);
});

test(`testing the AppRouter for SuperAdmin View...`, () => {
  const wrapper = shallow(<AppRouters isLoggedIn={true} role={"Sadmin"} />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("Router").length).toBe(1);
  expect(wrapper.find("div").length).toBe(1);
  expect(wrapper.find("Switch").length).toBe(1);
  expect(wrapper.find("Route").length).toBe(9);
});
