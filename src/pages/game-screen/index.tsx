import {Navigate} from 'react-router-dom';

import {QuestionArtist, QuestionGenre, Questions} from '../../types/question';
import {AppRoute, GameType} from '../../const';
import ArtistQuestionScreen from '../artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen';
import withAudioPlayer from '../../hocs/with-audio-player';
import { useAppDispath, useAppSelector } from '../../hooks';
import { incStep } from '../../store/action';

const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);

type GameScreenProps = {
    questions: Questions;
}

const GameScreen = ({questions}: GameScreenProps) => {
    const step = useAppSelector((state) => state.step);
    const question = questions[step];
    const dispatch = useAppDispath();

    if (step >= questions.length || !question) {
        return <Navigate to={AppRoute.Root}/>
    }

    switch (question.type) {
        case GameType.Artist:
            return (
                <ArtistQuestionScreenWrapped 
                    key={step}
                    question={question as QuestionArtist}
                    onAnswer={() => dispatch(incStep())}
                />
            );
        case GameType.Genre:
            return (
                <GenreQuestionScreenWrapped
                    key={step}
                    question={question as QuestionGenre}
                    onAnswer={() => dispatch(incStep())}
                />
            );
    }
}

export default GameScreen;