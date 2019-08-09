import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import FormComponent from "./FormComponent";
import "@testing-library/jest-dom";

describe("<FormComponent />", () => {
  it("renders without crashing", () => {
    render(<FormComponent />);
  });
  it("displays text", () => {
    const form = render(<FormComponent />);
    form.queryAllByText("Enter UserName");
  });

  it("has a submit button you can click", () => {
    const submitButton = getByTestId("Submit");
    fireEvent.click(submitButton);
    expect(submitButton).toHaveTextContent(/submit/i);
    expect(submitButton).toBeInTheDocument();
  });
});
