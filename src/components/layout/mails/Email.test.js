import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Email from './Email';

describe("Email Component", () => {
  const mockData = {
    subject: "Test Subject",
    senderEmail: "test@example.com",
    message: "Test Message"
  };

  test("renders the back button and email content", () => {
    const mockGoBackHandler = jest.fn();

    render(<Email data={mockData} goBack={mockGoBackHandler} />);

    const backButton = screen.getByText('Back', { exact: false});
    const subject = screen.getByText("Test Subject");
    const message = screen.getByText("Test Message");
    const email = screen.getByText("test@example.com");

    expect(backButton).toBeInTheDocument();
    expect(subject).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  })

  test("should simulate the back button click", () => {
    const mockGoBackHandler = jest.fn();

    render(<Email data={mockData} goBack={mockGoBackHandler} />);

    const backButton = screen.getByText('Back', { exact: false });
    fireEvent.click(backButton);

    expect(mockGoBackHandler).toBeCalledTimes(1);
  })

  test("renders from", () => {

    render(<Email data={mockData} />);

    const fromElement = screen.getByText('from', { exact: false});

    expect(fromElement).toBeInTheDocument;
  })
})