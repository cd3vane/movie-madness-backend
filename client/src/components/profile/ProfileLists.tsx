import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import ListsView from "../lists/ListsView";

const ProfileLists = ({ id }: any) => {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    getLists();
  }, [id]);

  const getLists = async () => {
    const res = await api.get(`/lists/user/${id}`);
    setLists(res.data);
    console.log(res.data);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold">Featured Lists</h1>
      {lists && <ListsView lists={lists} />}
    </div>
  );
};

export default ProfileLists;
