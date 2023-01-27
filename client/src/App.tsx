import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import AppRouter from "./AppRouter";
import Loader from "./components/UI/Loader";
import { IUser } from "./types/auth";
import { refresh } from "./service/authApi";

interface IUserContext {
  current: IUser | null;
  isLoading: boolean;
  setUser?: Dispatch<SetStateAction<IUser | null>>;
}

interface IPasswordModalContext {
  isVisible: boolean;
  setIsVisible?: Dispatch<SetStateAction<boolean>>;
}

interface IContext {
  user: IUserContext;
  passwordModal: IPasswordModalContext;
}

export const Context = createContext<IContext>({
  user: {
    current: null,
    isLoading: false,
  },
  passwordModal: {
    isVisible: false,
  },
});

const App = () => {
  // Эта информация должна храниться в state-менеджере, здесь сделал через контекст
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  const refreshToken = async () => {
    setIsLoading(true);

    const user = await refresh();

    if (user) {
      setUser(user.user);
    }
  };

  useEffect(() => {
    refreshToken().finally(() => setIsLoading(false));
  }, []);

  return (
    <Context.Provider
      value={{
        user: { current: user, setUser, isLoading },
        passwordModal: {
          isVisible: isPasswordModalVisible,
          setIsVisible: setIsPasswordModalVisible,
        },
      }}
    >
      {isLoading ? (
        <Loader className="position-absolute top-50 start-50 translate-middle" />
      ) : (
        <AppRouter />
      )}
    </Context.Provider>
  );
};

export default App;
