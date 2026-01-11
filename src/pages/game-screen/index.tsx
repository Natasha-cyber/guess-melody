import {useState} from 'react';
import {Navigate} from 'react-router-dom';

import {QuestionArtist, QuestionGenre, Questions} from '../../types/question';
import {AppRoute, GameType, FIRST_GAME_STEP} from '../../const';
import ArtistQuestionScreen from '../artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen';

type GameScreenProps = {
    questions: Questions;
}

const GameScreen = ({questions}: GameScreenProps) => {
    const [step, setStep] = useState(FIRST_GAME_STEP);
    const question = questions[step];

    if (step >= questions.length || !question) {
        return <Navigate to={AppRoute.Root}/>
    }

    switch (question.type) {
        case GameType.Artist:
            return (
                <ArtistQuestionScreen 
                    key={step}
                    question={question as QuestionArtist}
                    onAnswer={() => setStep((prevStep) => prevStep + 1)}
                />
            );
        case GameType.Genre:
            return (
                <GenreQuestionScreen 
                    key={step}
                    question={question as QuestionGenre}
                    onAnswer={() => setStep((prevStep) => prevStep + 1)}
                />
            );
    }
}

export default GameScreen;