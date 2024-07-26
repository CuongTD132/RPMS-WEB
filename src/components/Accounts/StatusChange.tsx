import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import Modal, { ModalHandle } from "../UI/Modal";
import Button from "../UI/Button";
import axios from "axios";
import { SERVER_URI } from "../../utils/uri";

type StatusChangeProps = {
  onClose: () => void;
  status: string;
  id: string;
  email: string;
};
export default function StatusChange({
  email,
  id,
  status,
  onClose,
}: StatusChangeProps) {
  const modal = useRef<ModalHandle>(null);
  const accessToken: string = JSON.parse(sessionStorage.getItem("userToken")!);
  const success = () =>
    toast.success(
      `Status of account ${email} has been updated to ${
        status === "Active" ? "Inactive" : "Active"
      }`
    );
  useEffect(() => {
    if (modal.current) {
      modal.current.open();
    }
  }, []);

  function handleSubmit(event: React.SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log(status === "Active" ? "Inactive" : "Active");
    axios.patch(
      `${SERVER_URI}/accounts/${id}`,
      status === "Active" ? "Inactive" : "Active",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    success();
    onClose();
  }
  return (
    <Modal ref={modal} onClose={onClose}>
      <div className="px-5 py-4">
        <h1 className="flex text-3xl mb-5 pb-2 border-b">
          Update status of&nbsp;
          <p className="text-yellow-500">{email}</p>
        </h1>
        <h1 className="flex text-xl">
          <p className=" text-yellow-300">{status}</p>
          &nbsp;is
          <p className="text-green-500">&nbsp;current status.&nbsp;</p>
          This action will update to&nbsp;
          {status === "Active" ? (
            <p className="text-red-400">Inactive</p>
          ) : (
            <p className="text-blue-400">Active</p>
          )}
        </h1>
        <p className="text-right space-x-8 mt-4 pt-4 border-t">
          <Button
            className="hover:text-slate-300"
            type="button"
            textOnly
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          >
            Confirm
          </Button>
        </p>
      </div>
    </Modal>
  );
}
