import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ContactCard from "@/components/Commons/ContactCard/ContactCard";

const mockProp = {
  data: { firstName: "Deny", lastName: "Wahyu", age: 20, photo: "" },
  onPress: () => ({}),
  onPressDelete: () => ({}),
  isDisabled: false,
};

test("render contact card", () => {
  render(<ContactCard {...mockProp} />);

  const component = screen.getAllByText(/deny/i);

  expect(component[0]).toBeInTheDocument();
});
