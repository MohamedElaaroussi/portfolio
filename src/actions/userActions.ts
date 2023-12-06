import { db } from "@/firebase";
import { desactivateUser } from "@/reducers/userSlice";
import { deleteUser, setError, setLoading, setTotal, setUsers } from "@/reducers/userSlice";
import { Paginations } from "@/utils/types";
import { getLastDocument } from "@/utils/utils";
import { collection, doc, getDoc, getDocs, limit, query, serverTimestamp, startAt, updateDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { Dispatch } from "redux";

export const fetchUsers = (filters: any, pagination: Paginations) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));

    const usersCollection = collection(db, 'administrators');
    let q1 = query(
      usersCollection,
      where('deleted_at', '==', null),
    );

    const snapshot = await getDocs(q1);
    const totalItems = snapshot.size; // Get total count directly from the snapshot
    dispatch(setTotal( totalItems ));
    // Apply pagination
    const { page, pageSize } = pagination;

    // Fetch the last document from the previous page to startAfter
    const lastDocument = await getLastDocument(q1, page, pageSize);

    // Use startAfter with the last document
    const q = query(q1, startAt(lastDocument), limit(pageSize));

    // Fetch data
    const querySnapshot = await getDocs(q);

    const users:any = [];

    querySnapshot.forEach((d) => {
     const userData = d.data();   
      users.push(userData);
    });

    dispatch(setUsers(users));
  } catch (error) {
    console.error('Error fetching users:', error);
    dispatch(setError('Failed to fetch users.'));
  } finally {
    dispatch(setLoading(false));

  }
};
export const desactivateUserAction = (userId: string) => async (dispatch: Dispatch) => {
  try {
    // Assuming you have a 'users' collection in Firestore
    const userDoc = doc(db, 'administrators', userId);
    const userSnapshot = await getDoc(userDoc);

    // Update the user fields and set deleted_at to the current server timestamp
    await updateDoc(userDoc, {
      status: "cancelled",
    });
    // Dispatch the local deletion action
    dispatch(desactivateUser(userId));
    toast.error("La désactivation a été effectuée avec succès.", {
      position: toast.POSITION.TOP_RIGHT,
    });

  } catch (error) {
    dispatch(setError("Échec de la désactivation de l'utilisateur."));
    toast.error("Échec de la désactivation d'utilisateur.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};


export const deleteUserAction = (userId:string) =>async (dispatch: Dispatch)=> {
    try {
      // Assuming you have a 'users' collection in Firestore
      const userDoc = doc(db, 'administrators', userId);
      const userSnapshot:any = await getDoc(userDoc);
  
      // Update the user fields and set deleted_at to the current server timestamp
      await updateDoc(userDoc, {
        deleted_at: serverTimestamp(),
      });
      // Dispatch the local deletion action
       dispatch(deleteUser(userId));
  
    } catch (error) {
      dispatch(setError('Failed to remove user.'));
    }
  };
  