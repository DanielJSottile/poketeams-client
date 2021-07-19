import React, {
  useState,
  useContext,
  useEffect,
  createContext,
  ReactNode,
} from 'react';
import { useLocation, useHistory } from 'react-router';
import GeneralContext from './GeneralContext';
import TokenService from '../services/token-service';
import jwtDecode from 'jwt-decode';

interface UserContextValues {
  isLoggedIn: boolean;
  user: string;
  userId: number;
  handleLogoutClick: () => void;
}

type UserContextProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextValues>({
  isLoggedIn: false,
  user: '',
  userId: 0,
  handleLogoutClick: () => null,
});

interface MyToken {
  sub: string;
  user_id: number;
}

export default UserContext;

export const UserContextProvider = ({
  children,
}: UserContextProps): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState(0);
  const { clearUserState } = useContext(GeneralContext);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setIsLoggedIn(!!TokenService.getAuthToken());
  }, [location]);

  useEffect(() => {
    if (isLoggedIn) {
      setUser(jwtDecode<MyToken>(TokenService.getAuthToken() || '').sub);
      setUserId(jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id);
    }
  }, [isLoggedIn]);

  const handleLogoutClick = async () => {
    console.log('i logged out');
    await TokenService.clearAuthToken();
    clearUserState();
    history.push('/landing');
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
