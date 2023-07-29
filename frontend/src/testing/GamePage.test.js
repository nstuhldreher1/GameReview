import { render, screen, fireEvent } from "@testing-library/react";
import GamePage from "../pages/GamePage";
import { BrowserRouter } from "react-router-dom";

// test block defined as:
// 1. render a component to test
// 2. find elements to interact with
// 3. interact with those elements
// 4. assert that the results are as expected

test('upon loading the game page, the navbar, game info and reviews for that game should be displayed', async () => {
    // render the component
    render(<BrowserRouter><GamePage /></BrowserRouter>);

    const navbar = await screen.findByTitle("navbar");
    const reviews = await screen.findByTitle("reviews");
    const game = await screen.findByTitle("game");

    expect(navbar).toBeInTheDocument();
    expect(reviews).toBeInTheDocument();
    expect(game).toBeInTheDocument();
});