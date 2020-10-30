import { render, screen } from '@testing-library/react';
import App from './App';

test('renders relevant elements', () => {
  render(<App />);
  const resetBtn = screen.getByText('Reset');
  expect(resetBtn).toBeInTheDocument();
});