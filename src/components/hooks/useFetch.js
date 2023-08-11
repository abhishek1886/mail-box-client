import { useDispatch } from "react-redux";
import { sentActions } from "../../store/sent-slice";
import axios from "axios";
import { useState } from "react";
import { inboxActions } from "../../store/inbox-slice";

const useGet = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const email = localStorage.getItem("email").replace(/[@.]/g, "");

  const fetchData = async (destination) => {
    const res = await axios.get(
      `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${email}/${destination}.json`
    );
    let storedData;
    if (res.data) {
      storedData = Object.entries(res.data).map(([key, value]) => ({
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
      });
    }
  };

  const patchData = async (id) => {
    console.log(id);
    await axios.patch(
      `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${email}/recieved/${id}.json`,
      {
        isNew: false,
      }
    );
    dispatch(inboxActions.removeItems({ type: "all" }));
  };

  const postData = async (email, destination, data) => {
    await axios.post(`https://mail-box-client-a8037-default-rtdb.firebaseio.com/${email}/${destination}.json`, data);
    
  }

  return {fetchData, data, patchData, postData};
};

export default useGet;
