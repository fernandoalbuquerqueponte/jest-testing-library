import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
  it("should render list items", () => {
    const { getByText } = render(<App />);

    expect(getByText("Fernando")).toBeInTheDocument();
    expect(getByText("Caio")).toBeInTheDocument();
    expect(getByText("Abreu")).toBeInTheDocument();
  });

  it("it should be able to add new item to the list", async () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    const input = getByPlaceholderText("Novo Item");
    const button = getByText("Adicionar");

    await userEvent.type(input, "Adicionar");
    await userEvent.click(button);

    await waitFor(() => {
      expect(getByText("Adicionar")).toBeInTheDocument();
    });
  });
  it("it should be able to add remove item from the list", async () => {
    const { getByText, getAllByText, queryByText } = render(<App />);

    const button = getByText("Adicionar");

    const removeButtons = getAllByText("Remover");

    userEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(queryByText("Fernando")).not.toBeInTheDocument();
    });
  });
});
