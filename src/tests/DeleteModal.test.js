import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DeleteModal from '../components/DeleteModal';

afterEach(cleanup);

describe('DeleteModal Tests', () => {
  it('Renders correctly', () => {
    const { getByTestId, asFragment } = render(<DeleteModal showModal={true} />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId('dialog-title')).toHaveTextContent(`delete this Item?`);
  });

  it('Inserts text into dialog content', () => {
    const staticDeleteText = 'Delete the todo with text:';
    const dynamicDeleteText = 'Hello Moto';
    const selectedItem = { text: dynamicDeleteText };
    const { getByTestId } = render(<DeleteModal showModal={true} selectedItem={selectedItem} />);

    expect(getByTestId('dialog-text')).toHaveTextContent(
      `${staticDeleteText} "${dynamicDeleteText}"`
    );
  });

  it('Calls functions when "Keep It" and "Trash It" buttons are pressed', () => {
    const toggleModal = jest.fn();
    const onTodoDelete = jest.fn();
    const { getByText } = render(
      <DeleteModal showModal={true} toggleModal={toggleModal} onTodoDelete={onTodoDelete} />
    );

    fireEvent.click(getByText('Keep It'));
    expect(toggleModal).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText('Trash It'));
    expect(onTodoDelete).toHaveBeenCalledTimes(1);
  });
});
