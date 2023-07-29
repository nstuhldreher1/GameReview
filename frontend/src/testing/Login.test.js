import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import { BrowserRouter } from "react-router-dom";

// test block defined as:
// 1. render a component to test
// 2. find elements to interact with
// 3. interact with those elements
// 4. assert that the results are as expected

test('upon loading the login page, the login form should be the first to display', async () => {
    // render the component
    render(<BrowserRouter><LoginPage /></BrowserRouter>);

    const loginForm = await screen.findByTitle("loginForm");

    expect(loginForm).toBeInTheDocument();
});