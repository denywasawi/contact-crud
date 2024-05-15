import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ListPage from "@/app/page";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

test("render list page", () => {
  useRouter();
  useDispatch();

  render(<ListPage />);

  const component = screen.getByRole("contact-list");

  expect(component).toBeInTheDocument();
});
