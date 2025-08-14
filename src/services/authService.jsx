
import { API_URLS, API_CONFIG, STORAGE_KEYS } from "../utils/constants";

export const authService = {

  async login(email, password) {
    try {
      const response = await fetch(API_URLS.LOGIN, {
        method: "POST",
        headers: API_CONFIG.LOGIN_HEADERS,
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.error === "user not found"
            ? "Credenciales incorrectas, intente nuevamente."
            : errorData.error || "Error al iniciar sesión";

        throw new Error(errorMessage);
      }

      const data = await response.json();

    
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(STORAGE_KEYS.USER_EMAIL, email);

      return {
        success: true,
        token: data.token,
        user: { email },
      };
    } catch (error) {
      console.error("Error en login:", error);
      return {
        success: false,
        error: error.message || "Error de conexión",
      };
    }
  },

     logout() {
     localStorage.removeItem(STORAGE_KEYS.TOKEN);
     localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
   },

 
  getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },


  getUser() {
    const email = localStorage.getItem(STORAGE_KEYS.USER_EMAIL);
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (!token || !email) {
      return null;
    }

    return { email };
  },


  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  },
};
