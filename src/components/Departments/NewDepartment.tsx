import { FormEvent, useEffect, useRef, useState } from "react";
import Modal, { ModalHandle } from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { toast } from "react-hot-toast";
type AddDepartmentProps = {
  onClose: () => void;
};

export default function AddDepartment({ onClose }: AddDepartmentProps) {
  const modal = useRef<ModalHandle>(null);
  const [error, setError] = useState(false);
  const success = () => toast.success("Department has been added succesfully!");
  useEffect(() => {
    if (modal.current) {
      modal.current.open();
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(false);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    success();
    console.log(data);
    onClose();
  }
  return (
    <Modal ref={modal} onClose={onClose}>
      <div className="px-5 py-4 space-y-3">
        <h2 className="text-3xl mb-5 pb-2 border-b">Add New Department</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <div>
              <Input
                className="w-full"
                label="Department Name:"
                id="name"
                name="name"
                type="text"
                placeholder="Department"
                required
              />
              {error && (
                <p className="pt-1 text-sm text-red-500">
                  Check this input again
                </p>
              )}
            </div>
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
