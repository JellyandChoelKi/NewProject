import { NavigateFunction } from 'react-router-dom';

export interface LoginFormProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setIsAdmin: (isAdmin: boolean) => void;
    setWarning: (warning: string | null) => void;
    isLoggedIn: boolean;
    isAdmin: boolean;
    navigate: NavigateFunction;
}
