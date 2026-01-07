import {BrowserRouter, Route, Routes} from 'react-router-dom';

import NotFoundScreen from '../../pages/not-found-screen';
import WelcomeScreen from '../../pages/welcome-screen';
import AuthScreen from '../../pages/auth-screen';
import GameOverScreen from '../../pages/game-over-screen';
import ArtistQuestionScreen from '../../pages/artist-question-screen';
import GenreQuestionScreen from '../../pages/genre-question-screen';
import WinScreen from '../../pages/win-screen';
import {AppRoute} from '../../const';

type AppScreenProps = {
    errorsCount: number;
}

function App({errorsCount}: AppScreenProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRoute.Root} element={<WelcomeScreen errorsCount={errorsCount}/>}/>
                <Route path={AppRoute.Result} element={<WinScreen/>}/>
                <Route path={AppRoute.DevGenre} element={<GenreQuestionScreen/>}/>
                <Route path={AppRoute.DevArtist} element={<ArtistQuestionScreen/>}/>
                <Route path={AppRoute.Lose} element={<GameOverScreen/>}/>
                <Route path={AppRoute.Login} element={<AuthScreen/>}/>
                <Route path="*" element={<NotFoundScreen/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;