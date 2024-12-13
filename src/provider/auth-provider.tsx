import { Session } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase";

// there are totally 6 steps to follow. check carefully

type AuthData = {
  session: Session | null;
  mounting: boolean;
  user: any;
};

//step 5 create a context with initial value
const AuthContext = createContext<AuthData>({
  session: null,
  mounting: true,
  user: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null); // step 1. using session
  const [user, setUser] = useState(null); // step 2. user state
  const [mounting, setMounting] = useState(true); // step 3. loader

  //step 4: get session and user in inital render
  useEffect(() => {
    // get session first
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      //after getting session, get its user details (don't use this until you bring in the users table in supabase)
      if (session) {
        const { data: user, error } = await supabase
          .from("users") // users table
          .select("*") // get everything
          .eq("id", session.user.id) // from the user where the user id matches/ equal to the given session's user "id"
          .single(); // expecting single data
        if (error) {
          console.error("error", error);
        } else {
          setUser(user);
        }
      }
      setMounting(false);
    };

    // call the above function
    fetchSession();
    // recent change - Listens to auth event changes
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // step 6. pass the context with updated state value into the provider
  return (
    <AuthContext.Provider value={{ session, mounting, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
