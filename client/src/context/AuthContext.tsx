import { createContext, useEffect, useReducer } from "react";
import { AuthState, AuthReducer, initialState } from "../reducers/AuthReducer";
import { api } from "../utils/api";

export const AuthContext = createContext<AuthState>(initialState);

export const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(state.token));
  }, [state]);

  const loadUser = async () => {
    try {
      const res = await api.get("/auth");

      dispatch({
        type: "USER_LOADED",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  const login = async (email: string, password: string) => {
    const loginPayload = { email, password };
    try {
      const res = await api.post("/auth", loginPayload);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      return res.data;
    } catch (err: any) {
      dispatch({
        type: "LOGIN_ERROR",
        error: err.response.data.errors,
      });
    }
  };

  const register = async (registerPayload: any) => {
    try {
      const res = await api.post("/users", registerPayload);

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      });
      loadUser();
    } catch (err: any) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error: any) => console.log(error.errorMessage));
      }

      dispatch({
        type: "REGISTER_FAIL",
      });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        userDetails: state.userDetails,
        token: state.token,
        loading: false,
        isAuthenticated: state.token ? true : false,
        errorMessage: "",
        login: login,
        logout: logout,
        register: register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
