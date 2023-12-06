// playerActions.ts
import { setPlayers, setLoading, setError, setTotal, deletePlayer } from '../reducers/playerSlice';
import { getDocs, collection, query, where, DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot, startAfter, limit, startAt, orderBy, doc, getDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Dispatch } from 'redux';
import { Paginations, Player, PlayerData } from '@/utils/types';
import { getLastDocument } from '@/utils/utils';
import { toast } from 'react-toastify';

export const fetchPlayers = (filters: any, pagination: Paginations) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const matchesCollection = collection(db, 'users');
    let q1 = query(
      matchesCollection,
      where('deleted_at', '==', null),
      orderBy('created_at', 'desc')
    );

    // Apply filters
    if (filters.host) {
      q1 = query(q1, where('host', '==', filters.host));
    }

    const snapshot = await getDocs(q1);
    const totalItems = snapshot.size; // Get total count directly from the snapshot
    dispatch(setTotal(totalItems));
    // Apply pagination
    const { page, pageSize } = pagination;

    // Fetch the last document from the previous page to startAfter
    const lastDocument = await getLastDocument(q1, page, pageSize);

    // Use startAfter with the last document
    const q = query(q1, startAt(lastDocument), limit(pageSize));

    // Fetch data
    const querySnapshot = await getDocs(q);
    const playerPromises: Promise<Player>[] = [];
    querySnapshot.docs.map(async (doc: any) => {
      const playerPromise = (async () => {
        const playerData: PlayerData = { id: doc.id, ...doc.data() };

        // Fetch related playeres
        const matchesCollection = collection(db, 'matches');
        const playersDesactiveQuery = query(matchesCollection, where('players', 'array-contains', doc.id), where('status', '==', 'pending'), where('deleted_at', '==', null));
        const playersActiveQuery = query(matchesCollection, where('players', 'array-contains', doc.id), where('status', '==', 'filled'), where('deleted_at', '==', null));
        const playersDesactiveSnapshot: any = await getDocs(playersDesactiveQuery);
        const playersActiveSnapshot: any = await getDocs(playersActiveQuery);
        // Calculate total price by adding player amounts
        let soldeRestant = 0;
        let revenueTotal = 0;

        playersDesactiveSnapshot.forEach((matchDoc: any) => {
          const matchData = matchDoc.data();
          if (matchData.price) {
            soldeRestant += matchData.price;
          }
        });
        playersActiveSnapshot.forEach((matchDoc: any) => {
          const matchData = matchDoc.data();
          if (matchData.price) {
            revenueTotal += matchData.price;
          }
        });
        return { id: playerData.id,profile:playerData.profile,time:playerData.created_at, email: playerData.email, name: playerData.name, role: playerData.role, revenueTotal, soldeRestant }
      })()
      // Add new total price to the player data

      playerPromises.push(playerPromise)
    });

    const players: Player[] = await Promise.all(playerPromises);


    dispatch(setPlayers(players));
  } catch (error) {
    console.error('Error fetching players:', error);
    dispatch(setError('Failed to fetch players.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteplayerAction = (playerId:string) =>async (dispatch: Dispatch)=> {
  try {
    // Assuming you have a 'players' collection in Firestore
    const playerDoc = doc(db, 'users', playerId);
    const playerSnapshot:any = await getDoc(playerDoc);

    // Update the player fields and set deleted_at to the current server timestamp
    await updateDoc(playerDoc, {
      deleted_at: serverTimestamp(),
    });
    // Dispatch the local deletion action
     dispatch(deletePlayer(playerId));

  } catch (error) {
    dispatch(setError('Failed to remove player.'));
  }
};
export const desactivatePlayerAction = (playerId: string) => async (dispatch: Dispatch) => {
  try {
    // Assuming you have a 'players' collection in Firestore
    const playerDoc = doc(db, 'users', playerId);
    const playerSnapshot = await getDoc(playerDoc);

    // Update the player fields and set deleted_at to the current server timestamp
    await updateDoc(playerDoc, {
      status: "cancelled",
    });
    // Dispatch the local deletion action
    // dispatch(desactivatePlayer(playerId));
    toast.error("La désactivation a été effectuée avec succès.", {
      position: toast.POSITION.TOP_RIGHT,
    });

  } catch (error) {
    dispatch(setError("Échec de la désactivation dujoueur."));
    toast.error("Échec de la désactivation du joueur.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};


