import { render, screen, fireEvent } from "@testing-library/react";
import EmailVerifyForm from "../components/EmailVerifyForm";
import { BrowserRouter } from "react-router-dom";

// test block defined as:
// 1. render a component to test
// 2. find elements to interact with
// 3. interact with those elements
// 4. assert that the results are as expected

test('Email verify form should be available on the login page', async () => {
    // render the component
    render(<BrowserRouter><EmailVerifyForm /></BrowserRouter>);

    const emailVerifyForm = await screen.findByTitle("emailVerifyForm");

    expect(emailVerifyForm).toBeInTheDocument();
});