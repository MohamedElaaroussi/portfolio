// matcheActions.ts
import { setMatches, setLoading, setError, setPagination, setTotal, deleteMatch, setHosts, addmatch, desactivateMatch } from '../reducers/matchSlice';
import { getDocs, collection, limit, query, where, orderBy, DocumentData, getDoc, doc, startAt, Query, addDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db, serverTimestamp } from '../firebase';
import { Dispatch } from 'redux';
import { RootState } from '@/reducers/rootReducers';
import { Match, MatchData, Paginations, PlayerData } from '@/utils/types';
import { getLastDocument } from '@/utils/utils';
import { toast } from 'react-toastify';


export const fetchMatches = (filters: any, pagination: Paginations, search: string | null) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));

    const matchesCollection = collection(db, 'matches');
    let q1 = query(
      matchesCollection,
      where('deleted_at', '==', null),
      orderBy('inserted_at', 'desc')
    );
    if (search) {
      const searchLower = search.toLowerCase();

      q1 = query(
        q1,
        where('address', '>=', searchLower),
        // where('address', '<', searchLower + '\uf8ff'), // Use '\uf8ff' as an upper bound
      );
    }
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
    q1 = query(q1, startAt(lastDocument), limit(pageSize));

    // Fetch data
    const querySnapshot = await getDocs(q1);

    const matchPromises: Promise<any>[] = [];

    querySnapshot.forEach((d) => {
      const matchPromise = (async () => {
        const matchData = d.data() as MatchData;

        const playersCount = matchData.players?.length || 0;
        const places = playersCount;
        const totalpaye = Number(places * matchData.price);

        const players = await Promise.all(
          (matchData.players || []).map(async (playerId: string) => {
            const playerDoc = doc(db, 'users', playerId);
            const playerSnapshot: any = await getDoc(playerDoc);

            return { id: playerSnapshot.id, name: playerSnapshot.data().name, profile: playerSnapshot.data().profile };
          })
        );

        const hostDoc = doc(db, 'users', matchData.id_host);
        const hostSnapshot: any = await getDoc(hostDoc);

        const host = { id: matchData.id_host, name: hostSnapshot.data().name, profile: hostSnapshot.data().profile };

        return {
          id: matchData.id,
          address: matchData.address,
          city: matchData.city,
          type: matchData.type,
          host,
          players,
          time: matchData.inserted_at,
          created_at: matchData.created_at,
          status: matchData.status,
          price: matchData.price,
          places,
          totalpaye,
        };
      })();

      matchPromises.push(matchPromise);
    });

    const matches: Match[] = await Promise.all(matchPromises);

    dispatch(setMatches(matches));
  } catch (error) {
    console.error('Error fetching matches:', error);
    dispatch(setError('Failed to fetch matches.'));
  } finally {
    dispatch(setLoading(false));

  }
};


export const addMatch = (matchData: any) => async (dispatch: Dispatch) => {
  try {
    console.log("Document written with ID: ", matchData);
    dispatch(setLoading(true));

    // Add the match to Firebase
    const matchesCollection = collection(db, 'matches');
    const newMatchRef = await addDoc(matchesCollection, matchData);

    // Fetch the newly added match to get its details
    const newMatchDoc = await getDoc(doc(db, 'matches', newMatchRef.id));
    const newMatch = newMatchDoc.data() as any;
    console.log("Document written with ID: ", newMatchDoc.id);
    // Add a new conversation with the match ID as a field
    const conversations = collection(db, 'conversations');
    const newConversationData = { id_match: newMatchDoc.id };
    const newConversationRef = await addDoc(conversations, newConversationData);
    const match = {
      id: newMatch.id,
      address: matchData.address,
      city: matchData.city,
      type: matchData.type,
      host: {},
      players: [],
      time: matchData.inserted_at,
      created_at: matchData.created_at,
      status: matchData.status,
      price: matchData.price,
      places: 0,
      totalpaye: 0,
    }
    // Update the Redux store
    dispatch(addmatch(match)); // Add the new match to the existing list

  } catch (error) {
    console.error('Error adding match:', error);
    dispatch(setError('Failed to add match.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const desactivateMatchAction = (matchId: string) => async (dispatch: Dispatch) => {
  try {
    // Assuming you have a 'matches' collection in Firestore
    const matchDoc = doc(db, 'matches', matchId);
    const matchSnapshot = await getDoc(matchDoc);

    // Update the match fields and set deleted_at to the current server timestamp
    await updateDoc(matchDoc, {
      status: "cancelled",
    });
    // Dispatch the local deletion action
    dispatch(desactivateMatch(matchId));
    toast.success("La désactivation a été effectuée avec succès.", {
      position: toast.POSITION.TOP_RIGHT,
    });

  } catch (error) {
    dispatch(setError("Échec de la désactivation du match."));
    toast.error("Échec de la désactivation du match.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const deleteMatchAction = (matchId: string) => async (dispatch: Dispatch) => {
  try {
    // Assuming you have a 'matchs' collection in Firestore
    const matchDoc = doc(db, 'matches', matchId);
    const matchSnapshot = await getDoc(matchDoc);

    // Update the match fields and set deleted_at to the current server timestamp
    await updateDoc(matchDoc, {
      deleted_at: serverTimestamp(),
    });
    // Dispatch the local deletion action
    dispatch(deleteMatch(matchId));
    toast.success("La suppression a été effectuée avec succès.", {
      position: toast.POSITION.TOP_RIGHT,
    });

  } catch (error) {
    dispatch(setError("Échec de la suppression du match."));
    toast.success("Échec de la suppression du match.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const selectMatchById = (matchId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setMatches(matchId));
    // Reference to the match document
    const matchDocRef = doc(db, 'matches', matchId);

    // Fetch the match data
    const matchSnapshot = await getDoc(matchDocRef);

    if (matchSnapshot.exists()) {
      const matchid = matchSnapshot.id;
      // dispatch(selectMatchId(matchid)); // Set the match data in the state
    } else {
      dispatch(setError('Match not found')); // Handle the case where the match doesn't exist
    }
  } catch (error) {
    console.error('Error fetching match:', error);
    dispatch(setError('Failed to fetch match.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchHosts = () => async (dispatch: Dispatch) => {
  try {
    const hostsCollection = collection(db, 'users');
    const q = query(
      hostsCollection,
      where('deleted_at', '==', null),
      where('role', '==', 'player'),
    );

    // Fetch data
    const querySnapshot = await getDocs(q);

    const hosts: any[] = [];

    querySnapshot.forEach((doc) => {
      const hostData = { id: doc.id, name: doc.data().name, email: doc.data().email, avatar: doc.data().profile };
      hosts.push(hostData);
    });
    dispatch(setHosts(hosts));
  } catch (error) {
    console.error('Error fetching hosts:', error);
    dispatch(setError('Failed to fetch hosts.'));
  }
};