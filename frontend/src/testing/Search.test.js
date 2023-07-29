import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../pages/Search";
import { BrowserRouter } from "react-router-dom";

// test block defined as:
// 1. render a component to test
// 2. find elements to interact with
// 3. interact with those elements
// 4. assert that the results are as expected

test('upon loading the search page, the navbar, search headers and search results should be displayed', async () => {
    // render the component
    render(<BrowserRouter><Search /></BrowserRouter>);

    const navbar = await screen.findByTitle("navbar");
    const searchHeader = await screen.findByTitle("searchHeader");
    const searchResults = await screen.findByTitle("searchResults");

    expect(navbar).toBeInTheDocument();
    expect(searchHeader).toBeInTheDocument();
    expect(searchResults).toBeInTheDocument();
});