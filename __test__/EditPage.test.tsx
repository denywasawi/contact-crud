import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import EditPage from "@/app/edit/[id]/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

test("render edit page", () => {
  useRouter;
  usePathname.mockReturnValue("/edit/id");
  useDispatch;
  useSelector.mockReturnValue({
    id: "",
    firstName: "",
    lastName: "",
    age: 0,
    photo: "",
  });

  render(<EditPage />);

  const component = screen.getByRole("edit-contact");

  expect(component).toBeInTheDocument();
});
