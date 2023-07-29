import { render, screen, fireEvent } from "@testing-library/react";
import GameCard from "../components/GameCard";
import { BrowserRouter } from "react-router-dom";

test('a game card should have these elements displayed', async () => {
    // render the component
    render(
        <BrowserRouter>
            <GameCard/>
        </BrowserRouter>
    );

    const image = await screen.findByAltText("Game cover art.");
    const gameTitle = await screen.findByTitle("gameTitle");

    expect(image).toBeInTheDocument();
    expect(gameTitle).toBeInTheDocument();
});