import { useDispatch } from "react-redux";
import deleteImage from "../../assets/delete.svg";
import editImage from "../../assets/edit.svg";
import { editActive } from "../../features/transaction/transactionSlice";

export default function Transaction({ transaction }) {
  const dispatch = useDispatch();
  const { name, amount, type } = transaction || {};

  const handleEdit = () => {
    dispatch(editActive(transaction));
  };

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button className="link" onClick={handleEdit}>
          <img alt="Edit" className="icon" src={editImage} />
        </button>
        <button className="link">
          <img alt="Delete" className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
}
