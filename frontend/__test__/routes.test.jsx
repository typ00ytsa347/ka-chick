import { describe, expect, it} from 'vitest';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
const { MemoryRouter } = require("react-router-dom")
import App from '../src/App'

//TODO Testing
//Test joining game
//Test adding an objective to game
//test uploading an imafe to objective
//test game not found page -add game not found page

it('renders homepage successfully', () => {

    const { getByText, queryByText, getByRole } = render(
        <MemoryRouter initialEntries={['/']}>
            <App/>
        </MemoryRouter>
    )

    expect(getByText('Ka-Chick')).toBeInTheDocument();
    expect(getByRole('button',{name:'Join Lobby'})).toBeInTheDocument();
    expect(getByRole('button',{name:'Create Lobby'})).toBeInTheDocument();
    expect(getByRole('button',{name:'Map Creator'})).toBeInTheDocument();
    expect(queryByText('Setup Map')).not.toBeInTheDocument();
    expect(queryByText('setup')).not.toBeInTheDocument();

})

it('renders lobby page correctly', () => {

    const { getByText, queryByText, getByRole } = render(
        <MemoryRouter initialEntries={['/lobby/join']}>
            <App/>
        </MemoryRouter>
    )

    expect(getByText('Join Lobby')).toBeInTheDocument();
    expect(getByText('Lobby ID')).toBeInTheDocument();
    expect(getByRole('button',{name:'Join'})).toBeInTheDocument();
    expect(getByRole('button',{name:'Back'})).toBeInTheDocument();
    expect(queryByText('Ka-Chick')).not.toBeInTheDocument();
})

it('renders create lobby page correctly',  () => {

    const { getByText, queryByText, getByRole } = render(
        <MemoryRouter initialEntries={['/lobby/create']}>
            <App/>
        </MemoryRouter>
    )

    expect(getByText('Create Lobby')).toBeInTheDocument();
    expect(getByText('Map ID')).toBeInTheDocument();
    expect(getByRole('button',{name:'Setup'})).toBeInTheDocument();
    expect(getByRole('button',{name:'Back'})).toBeInTheDocument();
    expect(queryByText('Ka-Chick')).not.toBeInTheDocument();
    
})

it('renders map setup correctly',  () => {

    const { getByText, queryByText, getByRole } = render(
        <MemoryRouter initialEntries={['/map/setup']}>
            <App/>
        </MemoryRouter>
    )

    expect(getByText('Setup Map')).toBeInTheDocument();
    expect(getByRole('button',{name:'Upload Images'})).toBeInTheDocument();
    expect(getByRole('button',{name:'Create Map'})).toBeInTheDocument();
    expect(getByRole('button',{name:'Back to Menu'})).toBeInTheDocument();
    expect(queryByText('Ka-Chick')).not.toBeInTheDocument();
})

it('renders wait for lobby page correctly', () => {

    const { getByText, queryByText, getByRole } = render(
        <MemoryRouter initialEntries={['/lobby/123']}>
            <App/>
        </MemoryRouter>
    )

    expect(getByText('Lobby 123')).toBeInTheDocument();
    expect(getByText('Waiting for game to start...')).toBeInTheDocument();
    expect(getByRole('button',{name:'Leave Game'})).toBeInTheDocument();
    expect(queryByText('Join Lobby')).not.toBeInTheDocument();
    
})

it('Renders 404 page when a page has not been found', () => {


})
