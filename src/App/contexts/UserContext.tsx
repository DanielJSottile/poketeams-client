import React, {
  useState,
  useContext,
  useEffect,
  createContext,
  ReactNode,
} from 'react';
import jwtDecode from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router';
import TokenService from '../services/token-service';
import GeneralContext from './GeneralContext';

interface UserContextValues {
  isLoggedIn: boolean;
  user: string;
  userId: string;
  handleLogoutClick: () => void;
}

type UserContextProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextValues>({
  isLoggedIn: !!TokenService.getAuthToken(),
  user: '',
  userId: '',
  handleLogoutClick: () => null,
});

interface MyToken {
  sub: string;
  user_id: string;
}

export default UserContext;

export const UserContextProvider = ({
  children,
}: UserContextProps): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const { clearUserState } = useContext(GeneralContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    /** check if the token is expired, and if so, clear the auth token */
    const isExpired = TokenService.isExpired();
    if (isExpired) {
      TokenService.clearAuthToken();
    }
    setIsLoggedIn(!!TokenService.getAuthToken() && !isExpired);
  }, [location]);

  useEffect(() => {
    if (isLoggedIn) {
      setUser(jwtDecode<MyToken>(TokenService.getAuthToken() || '').sub);
      setUserId(jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id);
    }
  }, [isLoggedIn]);

  const handleLogoutClick = () => {
    TokenService.clearAuthToken();
    clearUserState();
    /* I am unsure why the NavLink isnt doing this, 
    but i suspect it's trying to navigate while logged in still,
    so the 'to' property of a NavLink does not work. */
    navigate('/landing');
  };

  const value = {
    isLoggedIn,
    user,
    userId,
    setIsLoggedIn,
    setUser,
    setUserId,
    handleLogoutClick,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
