// ordereActions.ts
import { setOrders, setLoading, setError, setPagination, setTotal, deleteOrder, selectOrderId, desactivateOrder } from '../reducers/orderSlice';
import { getDocs, collection, limit, query, where, orderBy, DocumentData, getDoc, doc,startAt, startAfter, Query, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Dispatch } from 'redux';
import { Order, OrderData, Paginations } from '@/utils/types';
import { getLastDocument } from '@/utils/utils';
import { toast } from 'react-toastify';

export const fetchOrders = (filters: any, pagination: Paginations) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));

    const ordersCollection = collection(db, 'payments');
    let q1 = query(
      ordersCollection,
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
    q1 = query(q1, startAt(lastDocument), limit(pageSize));

    // Fetch data
    const querySnapshot = await getDocs(q1);

    const orderPromises: Promise<any>[] = [];

    querySnapshot.forEach((d) => {
      const orderPromise = (async () => {
        const OrderData = d.data() as OrderData;

        const userDoc = doc(db, 'users', OrderData.id_user);
        const userSnapshot:any = await getDoc(userDoc);

        const user = { userId: OrderData.id_user, name: userSnapshot.data().name };

        const matchDoc = doc(db, 'matches', OrderData.id_match);
        const matchSnapshot:any = await getDoc(matchDoc);

        const match = { matchId: OrderData.id_match, name: matchSnapshot.data().address };

        return {
          id: OrderData.id,
          amount: OrderData.amount,
          user,
          match,
          time: OrderData.created_at,
          provider: OrderData.provider,
          status: OrderData.status,
        };
      })();

      orderPromises.push(orderPromise);
    });

    const orders: Order[] = await Promise.all(orderPromises);

    dispatch(setOrders(orders));
  } catch (error) {
    console.error('Error fetching orders:', error);
    dispatch(setError('Failed to fetch orders.'));
  } finally {
    dispatch(setLoading(false));

  }
};

export const deleteorderAction = (orderId:string) =>async (dispatch: Dispatch)=> {
  try {
    // Assuming you have a 'orders' collection in Firestore
    const orderDoc = doc(db, 'payments', orderId);
    const orderSnapshot:any = await getDoc(orderDoc);

    // Update the order fields and set deleted_at to the current server timestamp
    await updateDoc(orderDoc, {
      deleted_at: serverTimestamp(),
    });
    // Dispatch the local deletion action
     dispatch(deleteOrder(orderId));

  } catch (error) {
    dispatch(setError("Échec de la suppression de la commande."));
    toast.error("Échec de la suppression de la commande.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
export const desactivateOrderAction = (orderId: string) => async (dispatch: Dispatch) => {
  try {
    // Assuming you have a 'orders' collection in Firestore
    const orderDoc = doc(db, 'payments', orderId);
    const orderSnapshot = await getDoc(orderDoc);

    // Update the order fields and set deleted_at to the current server timestamp
    await updateDoc(orderDoc, {
      status: "cancelled",
    });
    // Dispatch the local deletion action
    dispatch(desactivateOrder(orderId));
    toast.error("La désactivation a été effectuée avec succès.", {
      position: toast.POSITION.TOP_RIGHT,
    });

  } catch (error) {
    dispatch(setError("Échec de la désactivation de la commande."));
    toast.error("Échec de la désactivation de la commande.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const selectOrderById = (orderId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));

    // Reference to the order document
    const orderDocRef = doc(db, 'payments', orderId);

    // Fetch the order data
    const orderSnapshot = await getDoc(orderDocRef);

    if (orderSnapshot.exists()) {
      const orderid = orderSnapshot.id;
      dispatch(selectOrderId(orderid)); // Set the order data in the state
    } else {
      dispatch(setError('Order not found')); // Handle the case where the order doesn't exist
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    dispatch(setError('Failed to fetch order.'));
  } finally {
    dispatch(setLoading(false));
  }
};