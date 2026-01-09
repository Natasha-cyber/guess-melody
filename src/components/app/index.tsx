import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

import NotFoundScreen from '../../pages/not-found-screen';
import WelcomeScreen from '../../pages/welcome-screen';
import AuthScreen from '../../pages/auth-screen';
import GameOverScreen from '../../pages/game-over-screen';
import ArtistQuestionScreen from '../../pages/artist-question-screen';
import GenreQuestionScreen from '../../pages/genre-question-screen';
import WinScreen from '../../pages/win-screen';
import PrivateRoute from '../private-route';

import {AppRoute, AuthorizationStatus} from '../../const';
import {Questions} from '../../types/question';
import {QuestionGenre} from '../../types/question';

type AppScreenProps = {
    errorsCount: number;
    questions: Questions;
}

function App({errorsCount, questions}: AppScreenProps) {
    const [firstQuestion] = questions;

    return (
        <HelmetProvider>
            <BrowserRouter>
            <Routes>
                <Route path={AppRoute.Root} element={<WelcomeScreen errorsCount={errorsCount}/>}/>
                <Route path={AppRoute.DevGenre} element={<GenreQuestionScreen question={firstQuestion as QuestionGenre}/>}/>
                <Route path={AppRoute.DevArtist} element={<ArtistQuestionScreen/>}/>
                <Route path={AppRoute.Lose} element={<GameOverScreen/>}/>
                <Route path={AppRoute.Login} element={<AuthScreen/>}/>
                <Route 
                    path={AppRoute.Result} 
                    element={
                    <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                        <WinScreen/>
                    </PrivateRoute>
                    }
                    />
                <Route path="*" element={<NotFoundScreen/>}/>
            </Routes>
        </BrowserRouter>
        </HelmetProvider>
    )
}

export default App;