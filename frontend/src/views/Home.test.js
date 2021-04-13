import { render, screen, waitFor } from '@testing-library/react'
import Home from './Home'
import {BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';


describe("Home component", ()=>{

    test('renders Home Component', async () => { // eslint-disable-line
      let container=render(<Router>
        <Home />
        </Router>)
      const linkElement = container.getByTestId('github-oauth-link')
      expect(linkElement).toBeInTheDocument() // eslint-disable-line
    })
    test('Home Component Render with useeffect with successful api', async () => { // eslint-disable-line
        const mockCall= jest
        .spyOn(axios, "get")
        .mockImplementation(()=> Promise.resolve({data:'Connected'}))
        let container=render(<Router>
            <Home />
            </Router>)
        const linkElement = container.getByTestId('github-oauth-link')
        expect(linkElement).toBeInTheDocument() // eslint-disable-line
       await waitFor(()=>{

           expect(mockCall).toHaveBeenCalledTimes(1);
       }) 
      })
      test('Home Component Render with useeffect with Error api', async () => { // eslint-disable-line
        const mockCall= jest
        .spyOn(axios, "get")
        .mockImplementation(()=> Promise.reject('Error'))
        let container=render(<Router>
            <Home />
            </Router>)
        const linkElement = container.getByTestId('github-oauth-link')
        expect(linkElement).toBeInTheDocument() // eslint-disable-line
       await waitFor(()=>{

           expect(mockCall).toHaveBeenCalledTimes(1);
       }) 
      })
})
