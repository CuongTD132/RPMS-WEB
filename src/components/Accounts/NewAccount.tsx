import { FormEvent, useEffect, useRef, useState } from "react";
import Modal, { ModalHandle } from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { toast } from "react-hot-toast";
type AddAccountProps = {
  onClose: () => void;
};

export default function AddAccount({ onClose }: AddAccountProps) {
  const modal = useRef<ModalHandle>(null);
  const [error, setError] = useState(false);
  const success = () => toast.success("Account has been added succesfully!");
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
        <h2 className="text-3xl mb-5 pb-2 border-b">Add New Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <div>
              <Input
                className="w-full"
                label="First Name:"
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Nguyen"
                required
              />
              {error && (
                <p className="pt-1 text-sm text-red-500">
                  Check this input again
                </p>
              )}
            </div>
            <div>
              <Input
                className="w-full"
                label="Last Name:"
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Van A"
                required
              />
              {error && (
                <p className="pt-1 text-sm text-red-500">
                  Check this input again
                </p>
              )}
            </div>
          </div>
          <div>
            <Input
              className="w-full"
              label="Email:"
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              required
            />
            {error && (
              <p className="pt-1 text-sm text-red-500">
                Check this input again
              </p>
            )}
          </div>
          <div className="flex space-x-4">
            <div>
              <Input
                className="w-full"
                label="Password:"
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
              />
              {error && (
                <p className="pt-1 text-sm text-red-500">
                  Check this input again
                </p>
              )}
            </div>
            <div>
              <Input
                className="w-full"
                label="Confirm Password:"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="********"
                required
              />
              {error && (
                <p className="pt-1 text-sm text-red-500">
                  Check this input again
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-4">
            <div>
              <Input
                className="w-full"
                label="Code:"
                id="code"
                name="code"
                type="text"
                placeholder="PM12345"
                required
              />
              {error && (
                <p className="pt-1 text-sm text-red-500">
                  Check this input again
                </p>
              )}
            </div>
            <div>
              <label>Working Position:</label>
              <br />
              <select name="position" className="select" id="position">
                <option>Please select a position</option>
                <option value="Admin">Admin</option>
                <option value="Factory Director">Factory Director</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Product Staff">Product Staff</option>
                <option value="Inspection Manager">Inspection Manager</option>
                <option value="Inspection Staff">Inspection Staff</option>
                <option value="Warehouse Manager">Warehouse Manager</option>
              </select>
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
