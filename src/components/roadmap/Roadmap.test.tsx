import { Roadmap } from './Roadmap';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders roadmap component', () => {
  render(<Roadmap name="Test task" bigStyle={false} />);
});

test('renders roadmap component with a task name', () => {
  render(<Roadmap name="Test task" bigStyle={false} />);
  const taskName = screen.getByTestId('task-name');
  expect(taskName.textContent).toEqual('Test task');
});

test('renders roadmap component with small style', () => {
  render(<Roadmap name="Test task" bigStyle={false} />);
  const testDotSmall = screen.getByTestId('dot');
  const testLineSmall = screen.getByTestId('line');
  expect(testDotSmall).toHaveStyle(
    'background-color: #8394c4; width: 18px; height: 18px; left: 3px;'
  );
  expect(testLineSmall).toHaveStyle('left: 11px;');
});

test('renders roadmap component with big style', () => {
  render(<Roadmap name="Test task" bigStyle={true} />);
  const testDotBig = screen.getByTestId('dot');
  expect(testDotBig).toHaveStyle(
    'background-color: #1a3891; width: 24px; height: 24px;'
  );
});

test('renders roadmap component with date', () => {
  const { getByText } = render(
    <Roadmap
      name="Test task"
      date="2023-04-09T00:00:00.000Z"
      bigStyle={false}
    />
  );
  expect(getByText('09/04/2023'));
});

test('renders roadmap component with difficulty', () => {
  const { getByText } = render(
    <Roadmap name="Test task" difficulty={10} bigStyle={false} />
  );
  expect(getByText('10 pts'));
});
