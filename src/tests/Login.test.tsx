import { render, screen } from "@testing-library/react"
import IndexPage from "../pages/Index"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"

test("renders login", () => {
    render(<IndexPage />, {wrapper: BrowserRouter})
    const element = screen.getByText(/Etusivu/i)
    expect(element).toBeInTheDocument()
})