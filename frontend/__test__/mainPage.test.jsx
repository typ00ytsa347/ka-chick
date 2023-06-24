import { describe, expect, it, toBe} from 'vitest';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, getAllByRole } from '@testing-library/react';
const { MemoryRouter } = require("react-router-dom")
import App from '../src/App'
import { GameContext } from '../src/context/GameContextProvider';

it('renders the main game page correctly', () => {
    const { getByText, getAllByRole, getByRole } = render(
        <MemoryRouter initialEntries={['/game/123']}>
            <GameContext.Provider>
                <App/>
            </GameContext.Provider>
        </MemoryRouter>
    )
    expect(getByText('Game 123')).toBeInTheDocument;
    expect(getByText('Timer')).toBeInTheDocument;
    expect(getByText('Found 0 of 8')).toBeInTheDocument;
    expect(getByRole('button',{name:'End Game'})).toBeInTheDocument;

    const numOfImages= getAllByRole('img');
    

    //number of objectives is 8 + 2 images for the background     
    expect(numOfImages.length).toBe(10)
})