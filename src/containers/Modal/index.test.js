/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./index";

describe("Modal", () => {
  it("renders the modal content when opened is true", () => {
    render(
      <Modal opened Content={<div>Modal Content</div>}>
        {() => null}
      </Modal>
    );
    const modalContent = screen.getByText("Modal Content");
    expect(modalContent).toBeInTheDocument();
  });

  it("does not render the modal content when opened is false", () => {
    render(
      <Modal opened={false} Content={<div>Modal Content</div>}>
        {() => null}
      </Modal>
    );
    const modalContent = screen.queryByText("Modal Content");
    expect(modalContent).not.toBeInTheDocument();
  });

  it("calls setIsOpened with false when the close button is clicked", () => {
    const setIsOpened = jest.fn();
    render(
      <Modal opened Content={<div>Modal Content</div>}>
        {() => (
          <button onClick={() => setIsOpened(false)}>Close Modal</button>
        )}
      </Modal>
    );
    const closeButton = screen.getByText("Close Modal");
    fireEvent.click(closeButton);
    expect(setIsOpened).toHaveBeenCalledWith(false);
  });
});