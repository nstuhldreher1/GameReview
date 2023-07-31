import { render, screen, fireEvent } from "@testing-library/react";
import User from "../components/User";
import { BrowserRouter } from "react-router-dom";

// test block defined as:
// 1. render a component to test
// 2. find elements to interact with
// 3. interact with those elements
// 4. assert that the results are as expected

test('should display the contents of a user', async () => {
    // render the component
    render(<BrowserRouter><User /></BrowserRouter>);

    const username = await screen.findByTitle("username");
    const email = await screen.findByTitle("email");

    expect(username).toBeInTheDocument();
    expect(email).toBeInTheDocument();
});