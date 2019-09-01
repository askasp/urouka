import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

interface authprops {
  isAuthenticated: boolean;
  user?: any;
  loading?: any;
  popupOpen?: any;
  loginWithPopup?: any;
  handleRedirectCallback?: any;
  getIdTokenClaims: (...p: any[]) => void;
  loginWithRedirect: (...p: any[]) => void;
  getTokenSilently: (...p: any[]) => Promise<string>;
  getTokenWithPopup: (...p: any[]) => Promise<string>;
  logout: (...p: any[]) => void;
}

export const Auth0Context = React.createContext<authprops>({} as authprops);
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: Auth0ClientOptions & {
  children: any;
  onRedirectCallback: (x: any) => void;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p: any[]) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p: any[]) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p: any[]) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p: any[]) => auth0Client.getTokenWithPopup(...p),
        logout: (...p: any[]) => auth0Client.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
