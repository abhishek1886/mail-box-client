import { useDispatch, useSelector } from "react-redux";
import { sentActions } from "../../store/sent-slice";
import axios from "axios";
import { useState } from "react";
import { inboxActions } from "../../store/inbox-slice";
import { draftActions } from "../../store/draft-slice";

const useGet = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const email = localStorage.getItem("email").replace(/[@.]/g, "");
  const inbox = useSelector((state) => state.inbox.inboxItems);

  const fetchData = async (destination, type) => {
    const res = await axios.get(
      `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${email}/${destination}.json`
    );
    if (res.data) {
      const storedData = Object.entries(res.data).map(([key, value]) => ({
        ...value,
        _id: key,
      }));
      setData(storedData);
      storedData.forEach((data) => {
        if (destination === "sent") {
          dispatch(sentActions.addItem(data));
        }
        if (destination === "recieved") {
          dispatch(inboxActions.addItems(data));
        }
        if(destination === "drafts"){
          dispatch(draftActions.addItem(data));
        }
      });

      if (type === true) {
        if (data) {
          const newMails = storedData.filter(
            (data) => !inbox.some((d) => d._id === data._id)
          );
          if (newMails.length > 0) {
            newMails.forEach((data) => {
              dispatch(inboxActions.addItems(data));
            });
          }
        }
      }
    }
  };

  const patchData = async (id) => {
    await axios.patch(
      `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${email}/recieved/${id}.json`,
      {
        isNew: false,
      }
    );
    dispatch(inboxActions.removeItems({ type: "all" }));
  };

  const postData = async (email, destination, data) => {
    await axios.post(
      `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${email}/${destination}.json`,
      data
    );
  };

  const deleteData = async (id, destination) => {
    if(destination === 'recieved'){
      dispatch(inboxActions.removeItems({ _id: id }));
    }
    if(destination === 'sent'){
      dispatch(sentActions.removeItems({ _id: id }))
    }

    await axios.delete(
      `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${email}/${destination}/${id}.json`
    );
  };

  return { fetchData, data, patchData, postData, deleteData };
};

export default useGet;
