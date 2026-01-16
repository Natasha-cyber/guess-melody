import {Navigate} from 'react-router-dom';

import {QuestionArtist, QuestionGenre, Questions} from '../../types/question';
import {AppRoute, GameType} from '../../const';
import ArtistQuestionScreen from '../artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen';
import withAudioPlayer from '../../hocs/with-audio-player';
import { useAppDispath, useAppSelector } from '../../hooks';
import { incStep } from '../../store/action';
import Mistakes from '../../components/mistakes';

const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);

type GameScreenProps = {
    questions: Questions;
}

const GameScreen = ({questions}: GameScreenProps) => {
    const step = useAppSelector((state) => state.step);
    const question = questions[step];
    const dispatch = useAppDispath();
    const mistakes = useAppSelector((state) => state.mistakes);

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
                >
                    <Mistakes count={mistakes}/>
                </ArtistQuestionScreenWrapped>
            );
        case GameType.Genre:
            return (
                <GenreQuestionScreenWrapped
                    key={step}
                    question={question as QuestionGenre}
                    onAnswer={() => dispatch(incStep())}
                >
                    <Mistakes count={mistakes}/>
                </GenreQuestionScreenWrapped>
            );
    }
}

export default GameScreen;