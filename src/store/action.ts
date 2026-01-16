import { createAction } from '@reduxjs/toolkit';

export const incStep = createAction('game/incStep');

export const resetGame = createAction('game/reset');