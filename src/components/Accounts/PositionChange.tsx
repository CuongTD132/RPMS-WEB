import { FormEvent, useEffect, useRef, useState } from "react";
import Modal, { ModalHandle } from "../UI/Modal";
import Button from "../UI/Button";
import { toast } from "react-hot-toast";
type PositionChangeProps = {
  onClose: () => void;
  position: string;
  firstName: string;
  lastName: string;
};
export default function PositionChange({
  position,
  firstName,
  lastName,
  onClose,
}: PositionChangeProps) {
  const modal = useRef<ModalHandle>(null);
  const [selectedPosition, setSelectedPosition] = useState("Admin");
  const success = () =>
    toast.success(
      `Position of ${firstName} ${lastName} has been changed to ${selectedPosition}`
    );
  useEffect(() => {
    if (modal.current) {
      modal.current.open();
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    success();
    onClose();
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPosition(event.target.value);
  };
  return (
    <Modal ref={modal} onClose={onClose}>
      <div className="px-5 py-4">
        <h1 className="flex text-3xl mb-5 pb-2 border-b">
          Update position of&nbsp;
          <p className="text-yellow-500">
            {firstName} {lastName}
          </p>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex items-end space-x-2">
            <div>
              <h1 className="text-2xl text-yellow-300">{position}</h1>
              <h1 className="flex">
                is <p className="text-green-500">&nbsp;current possion&nbsp;</p>
                and will change to:
              </h1>
            </div>
            <select
              className="select"
              id="position"
              value={selectedPosition}
              onChange={handleChange}
            >
              {/* <option defaultValue={position}>{position}</option> */}
              {position !== "Admin" && <option value="Admin">Admin</option>}
              {position !== "Factory Director" && (
                <option value="Factory Director">Factory Manager</option>
              )}
              {position !== "Product Manager" && (
                <option value="Product Manager">Product Manager</option>
              )}
              {position !== "Product Staff" && (
                <option value="Product Staff">Product Staff</option>
              )}
              {position !== "Inspection Manager" && (
                <option value="Inspection Manager">Inspection Manager</option>
              )}
              {position !== "Inspection Staff" && (
                <option value="Inspection Staff">Inspection Staff</option>
              )}
              {position !== "Warehouse Manager" && (
                <option value="Warehouse Manager">Warehouse Manager</option>
              )}
            </select>
          </div>
          <p className="text-right space-x-8 mt-4 pt-4 border-t">
            <Button
              className="hover:text-slate-300"
              type="button"
              textOnly
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
              Confirm
            </Button>
          </p>
        </form>
      </div>
    </Modal>
  );
}
