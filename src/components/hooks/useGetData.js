import { useDispatch } from "react-redux";
import { sentActions } from "../../store/sent-slice";
import axios from "axios";
import { useEffect, useState } from "react";
import { inboxActions } from "../../store/inbox-slice";

const useGetData = (destination) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const email = localStorage.getItem("email").replace(/[@.]/g, "");

  let storedData;

  useEffect(() => {
    const fetchData = async (destination) => {
      const res = await axios.get(
        `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${email}/${destination}.json`
      );

      if (res.data) {
        storedData = Object.entries(res.data).map(([key, value]) => ({
          ...value,
          _id: key,
        }));
        setData(storedData);
        console.log("fetchdata called");
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
    fetchData();
  }, [destination]);

  return { data };
};

export default useGetData;
