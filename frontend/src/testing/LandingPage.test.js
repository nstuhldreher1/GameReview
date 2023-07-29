import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "../pages/LandingPage";
import { BrowserRouter } from "react-router-dom";

// test block defined as:
// 1. render a component to test
// 2. find elements to interact with
// 3. interact with those elements
// 4. assert that the results are as expected

test('landing page should display logo, welcome text, and get started button', async () => {
    // render the component
    render(<BrowserRouter><LandingPage /></BrowserRouter>);

    const welcomeMessage = await screen.findByTitle("welcomeMessage");
    const logo = await screen.findByTitle("logo");
    const getStartedButton = await screen.findByTitle("getStartedButton");

    expect(welcomeMessage).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(getStartedButton).toBeInTheDocument();
});
