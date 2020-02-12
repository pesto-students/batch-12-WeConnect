import React from "react";
import { shallow } from "enzyme";
import Homepage from "../../views/Homepage";

describe("Test Homepage Component", () => {
  it("ValidateSearch method for search term for more than 3 char", () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper.exists()).toBe(true);
    const mockEvent = {
      target: {
        value: "test"
      }
    };
    const expected = {
      helperText: "",
      error: false,
      searchTerm: "test"
    };
    const instance = wrapper.instance();
    instance.validateSearch(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });

  it("ValidateSearch for search term for less than 3 charr", () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper.exists()).toBe(true);
    const mockEvent = {
      target: {
        value: "tt"
      }
    };
    const expected = {
      helperText: "Enter atleast 3 char",
      error: true,
      searchTerm: ""
    };
    const instance = wrapper.instance();
    instance.validateSearch(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });

  it("Validate Button To Work If Search Term consists of at least 3 char", () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper.exists()).toBe(true);
    const expected = {
      helperText: "",
      error: false,
      searchTerm: ""
    };
    const instance = wrapper.instance();
    instance.getWorkSpace();
    expect(wrapper.state()).toEqual(expected);
  });
});
