import React, {
  useState,
  useContext,
  useEffect,
  createContext,
  ReactNode,
} from 'react';
import GeneralContext from './GeneralContext';
import TokenService from '../services/token-service';
import jwtDecode from 'jwt-decode';

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
  isLoggedIn: false,
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

  useEffect(() => {
    setIsLoggedIn(!!TokenService.getAuthToken());
    setUser(jwtDecode<MyToken>(TokenService.getAuthToken() || '').sub);
    setUserId(jwtDecode<MyToken>(TokenService.getAuthToken() || '').user_id);
  }, []);

  const handleLogoutClick = () => {
    TokenService.clearAuthToken();
    clearUserState();
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
