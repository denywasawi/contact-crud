import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import AddPage from "@/app/add/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

test("render add page", () => {
  useRouter;
  useDispatch;
  useSelector.mockReturnValue({
    firstName: "",
    lastName: "",
    age: 0,
    photo: "",
  });

  render(<AddPage />);

  const component = screen.getByRole("add-contact");

  expect(component).toBeInTheDocument();
});
