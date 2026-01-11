import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

import NotFoundScreen from '../../pages/not-found-screen';
import WelcomeScreen from '../../pages/welcome-screen';
import AuthScreen from '../../pages/auth-screen';
import GameOverScreen from '../../pages/game-over-screen';
import WinScreen from '../../pages/win-screen';
import GameScreen from '../../pages/game-screen';
import PrivateRoute from '../private-route';

import {AppRoute, AuthorizationStatus} from '../../const';
import {Questions} from '../../types/question';

type AppScreenProps = {
    errorsCount: number;
    questions: Questions;
}

function App({errorsCount, questions}: AppScreenProps) {
    return (
        <HelmetProvider>
            <BrowserRouter>
            <Routes>
                <Route path={AppRoute.Root} element={<WelcomeScreen errorsCount={errorsCount}/>}/>
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
                <Route 
                    path={AppRoute.Game} 
                    element={
                    <GameScreen 
                        questions={questions}
                    />
                    }
                />
                <Route path="*" element={<NotFoundScreen/>}/>
            </Routes>
        </BrowserRouter>
        </HelmetProvider>
    )
}

export default App;