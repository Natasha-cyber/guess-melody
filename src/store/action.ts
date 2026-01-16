import { createAction } from '@reduxjs/toolkit';
import { Question, UserAnswer } from '../types/question';

export const incStep = createAction('game/incStep');

export const checkUserAnswer = createAction<{question: Question, userAnswer: UserAnswer}>
    ('game/checkUserAnswer');

export const resetGame = createAction('game/reset');