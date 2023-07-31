import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "../pages/Profile";
import { BrowserRouter } from "react-router-dom";

// test block defined as:
// 1. render a component to test
// 2. find elements to interact with
// 3. interact with those elements
// 4. assert that the results are as expected

test('upon loading the profile page of a user, the users posts should be displayed', async () => {
    // render the component
    render(<BrowserRouter><Profile /></BrowserRouter>);

    const posts = await screen.findByTitle("posts");

    expect(posts).toBeInTheDocument();
});