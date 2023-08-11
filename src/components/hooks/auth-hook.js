import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const authAction = async (payload, type) => {
    try {
      console.log(payload, type);
      let res;

      if (type === "signup") {
        res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDH9plc7T7h6CQDIKTBp6HCF-nBjgzPDHg`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (type === "login") {
        res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDH9plc7T7h6CQDIKTBp6HCF-nBjgzPDHg`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (type === "forgotPassword") {
        res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDH9plc7T7h6CQDIKTBp6HCF-nBjgzPDHg`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      const data = await res.json();
      if (res.ok) {
        if (type === "signup") {
          history.replace("/login");
        }

        if (type === "login") {
          dispatch(
            authActions.login({ token: data.idToken, email: data.email })
          );
          history.push("/home");
        }

        if(type === 'forgotPassword') {
          history.push('/');
        }
      } else {
        let errorMessage = "Something went wrong! Try again.";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return [authAction];
};

export default useAuth;
