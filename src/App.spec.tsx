import { render, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import List from "./components/list-tem";

describe("App Component", () => {
  it("should render list items", () => {
    const { getByText, rerender, queryByText } = render(
      <List initialItems={["Fernando", "Abreu Motta", "Caio Motta"]} />
    );

    expect(getByText("Fernando")).toBeInTheDocument();
    expect(getByText("Caio Motta")).toBeInTheDocument();
    expect(getByText("Abreu Motta")).toBeInTheDocument();

    rerender(<List initialItems={["Julia"]} />);

    expect(getByText("Julia")).toBeInTheDocument();
    expect(queryByText("Abreu Motta")).not.toBeInTheDocument();
  });

  it("it should be able to add new item to the list", async () => {
    const { getByText, getByPlaceholderText } = render(
      <List initialItems={[]} />
    );

    const input = getByPlaceholderText("Novo Item");
    const button = getByText("Adicionar");

    await userEvent.type(input, "Adicionar");
    await userEvent.click(button);

    await waitFor(() => {
      expect(getByText("Adicionar")).toBeInTheDocument();
    });
  });
  it("it should be able to add remove item from the list", async () => {
    const { getAllByText, queryByText } = render(
      <List initialItems={["Fernando"]} />
    );

    const removeButtons = getAllByText("Remover");

    userEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(queryByText("Fernando")).not.toBeInTheDocument();
    });
  });
});
