import { render, fireEvent } from '@testing-library/react';
import { PersonForm } from './person-form.component';

describe('PersonForm', () => {
  test('renders form fields', () => {
    const { getByPlaceholderText } = render(<PersonForm onCreatePerson={() => {}} />);
    expect(getByPlaceholderText('Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Show')).toBeInTheDocument();
    expect(getByPlaceholderText('Actor/Actress')).toBeInTheDocument();
    expect(getByPlaceholderText('Date of Birth')).toBeInTheDocument();
    expect(getByPlaceholderText('Movies')).toBeInTheDocument();
  });

  test('submits form data', () => {
    const onCreatePerson = jest.fn();
    const { getByPlaceholderText, getByText } = render(<PersonForm onCreatePerson={onCreatePerson} />);
    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByPlaceholderText('Show'), { target: { value: 'Some Show' } });
    fireEvent.change(getByPlaceholderText('Actor/Actress'), { target: { value: 'Jane Doe' } });
    fireEvent.change(getByPlaceholderText('Date of Birth'), { target: { value: '1990-01-01' } });
    fireEvent.change(getByPlaceholderText('Movies'), { target: { value: 'Movie 1, Movie 2' } });
    fireEvent.click(getByText('Create Person'));
    expect(onCreatePerson).toHaveBeenCalledWith({
      name: 'John Doe',
      show: 'Some Show',
      actor: 'Jane Doe',
      dob: '1990-01-01',
      movies: 'Movie 1, Movie 2',
    });
  });
});
