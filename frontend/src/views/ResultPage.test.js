import { render, screen, waitFor } from '@testing-library/react';
import ResultPage from './ResultPage';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

describe('Home component', () => {
  test('renders Home Component', async () => {
    // eslint-disable-line
    let container = render(
      <Router>
        <ResultPage />
      </Router>
    );
    const linkElement = container.getByTestId('username-id');
    expect(linkElement).toBeInTheDocument(); // eslint-disable-line
  });
  test('Home Component Render with useeffect with successful api', async () => {
    // eslint-disable-line
    const mockCall = jest
      .spyOn(axios, 'get')
      .mockImplementation(() =>
        Promise.resolve({
          data: {
            login: 'name',
            email: 'emsil@gmail.com',
            company: 'company',
            location: 'location',
          },
        })
      );
    let container = render(
      <Router>
        <ResultPage />
      </Router>
    );
    const linkElement = container.getByTestId('username-id');
    expect(linkElement).toBeInTheDocument(); // eslint-disable-line
    await waitFor(() => {
      expect(mockCall).toHaveBeenCalledTimes(1);
    });
  });
  test('Home Component Render with useeffect with Error api', async () => {
    // eslint-disable-line
    const mockCall = jest
      .spyOn(axios, 'get')
      .mockImplementation(() => Promise.reject('Error'));
    let container = render(
      <Router>
        <ResultPage />
      </Router>
    );
    const linkElement = container.getByTestId('username-id');
    expect(linkElement).toBeInTheDocument(); // eslint-disable-line
    await waitFor(() => {
      expect(mockCall).toHaveBeenCalledTimes(1);
    });
  });
});
