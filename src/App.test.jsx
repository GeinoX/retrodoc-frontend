import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import App from './App';

vi.mock('./api', () => ({
  apiFetch: vi.fn(() => Promise.resolve({ message: 'ok' })),
}));

describe('App', () => {
  it('affiche le titre RetroDoc', () => {
    render(<App />);
    expect(screen.getByText('RetroDoc')).toBeInTheDocument();
  });
});