import { render, screen, fireEvent } from "@testing-library/react";
import GameReview from "../components/GameReview";
import { BrowserRouter } from "react-router-dom";

// test block defined as:
// 1. render a component to test
// 2. find elements to interact with
// 3. interact with those elements
// 4. assert that the results are as expected

test('each game review should have these html displayed at all times', async () => {
    // render the component
    render(<BrowserRouter><GameReview /></BrowserRouter>);

    // find the html elements
    const reviewerProfilePicture = await screen.findByTitle("reviewerProfilePicture");
    const activity = await screen.findByTitle("activity");
    const reviewStars = await screen.findByTitle("reviewStars");
    const reviewDescription = await screen.findByTitle("reviewDescription");

    expect(reviewerProfilePicture).toBeInTheDocument();
    expect(activity).toBeInTheDocument();
    expect(reviewStars).toBeInTheDocument();
    expect(reviewDescription).toBeInTheDocument();
});

test('a game review should display with these specific props', async () => {
    // render the component
    render(
        <BrowserRouter>
            <GameReview activity={"firstname lastname @username has review x"} 
                        comment={"This game is great!"}/>
        </BrowserRouter>
    );

    const activity = await screen.findByText(/firstname lastname @username has review x/i);
    const reviewDescription = await screen.findByText(/This game is great!/i);

    expect(activity).toBeInTheDocument();
    expect(reviewDescription).toBeInTheDocument();
});