import { createBrowserRouter } from 'react-router-dom';
import Root from './Pages/Root';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import SearchPage, { loadAll } from './Pages/SearchPage';
import Profile from './Pages/Profile';
import ProtectedRoute from './Middleware/ProtectedRoute';
import SignIn from './Pages/SignIn';
import GameDetails, { getGameDetails } from './Pages/GameDetails';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '*',
                element: <NotFound />,
            },
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/search-page',
                element: <SearchPage />,
                loader: loadAll,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/sign-in',
                element: <SignIn />,
            },
            {
                path: '/profile',
                element: <ProtectedRoute element={<Profile />} />,
            },
            {
                path: '/game/:id',
                element: <GameDetails />,
                loader: getGameDetails,
            },
        ],
    },
]);
