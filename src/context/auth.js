import { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
};

const storedObject = localStorage.getItem('jwtToken');

if (storedObject) {
  const decoded = jwtDecode(storedObject);

  if (decoded.exp * 1000 < Date.now()) {
    // token expired, remove!
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decoded;
  }
}

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

const reducers = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  const login = (userData) => {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
