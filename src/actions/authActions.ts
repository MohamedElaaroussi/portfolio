// authActions.ts
import { Dispatch } from 'redux';
import { loginUserStart, loginUserSuccess, loginUserFailure, logoutUser } from '../reducers/authSlice';
import { auth, db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from "react-toastify";

export const loginUser = (email: string, password: string) => async (dispatch: Dispatch) => {
 
  try {
    dispatch(loginUserStart());

    // Assuming you are using Firebase authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    const userDoc = doc(db, 'administrators', user.uid);
    const userSnapshot: any = await getDoc(userDoc);

    dispatch(loginUserSuccess({ user: { id: userSnapshot.id, email: userSnapshot.email ,username: userSnapshot.name || '', avatar:userSnapshot.profile, role:userSnapshot.role } }));
  
  } catch (error:any) {
    console.error('Error logging in:', error.message);
    toast.error("Email ou mot de passe est incorrect !", {
      position: toast.POSITION.TOP_RIGHT,
    });
    dispatch(loginUserFailure({ error: 'Failed to log in. Please check your credentials.' }));
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  try {
    // Assuming you are using Firebase authentication
    await auth.signOut();
    
    dispatch(logoutUser());

  } catch (error:any) {
    console.error('Error logging out:', error.message);
  }
};
