import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "../pages/Signup";
import { BrowserRouter } from "react-router-dom";

// test block defined as:
// 1. render a component to test
// 2. find elements to interact with
// 3. interact with those elements
// 4. assert that the results are as expected

test('signup form should be displayed on the signup page', async () => {
    // render the component
    render(<BrowserRouter><Signup /></BrowserRouter>);

    const formTitle = await screen.findByTitle("signupForm");

    expect(formTitle).toBeInTheDocument();
});

test('check if the user input for the signup form is formatted correctly', async () => {
    // render the component
    render(<BrowserRouter><Signup /></BrowserRouter>);

    // find the input html elements
    const firstName = await screen.findByTitle("firstName");
    const lastName = await screen.findByTitle("lastName");
    const username = await screen.findByTitle("username");
    const email = await screen.findByTitle("email");
    const password = await screen.findByTitle("password");

    // mock user input
    fireEvent.change(firstName, { target: { value: "test1"} });
    fireEvent.change(lastName, { target: { value: "test1"} });
    fireEvent.change(username, { target: { value: "test1"} });
    fireEvent.change(email, { target: { value: "test1@gmail.com"} });
    fireEvent.change(password, { target: { value: "Test1!"} });

    // call function
    const result = Signup.checkInput();

    expect(result).toBe(true);
});