import { ChangeEvent, useEffect, useRef, useState } from "react";
import Modal, { ModalHandle } from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { SERVER_URI } from "../../utils/uri";
import { dataProps, responseProps } from "../../pages/Login";
type AccountProps = {
  code: string;
  email: string;
  password: string;
  personalInfo: personalInfoProps;
};
type AddAccountProps = {
  onClose: () => void;
};
type personalInfoProps = {
  fullName: string;
  position: string;
  departmentId?: string;
};
export default function AddAccount({ onClose }: AddAccountProps) {
  const modal = useRef<ModalHandle>(null);
  const accessToken: string = JSON.parse(sessionStorage.getItem("userToken")!);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("2");
  const [selectedDepartment, setSelectedDepartment] = useState(
    "0f8cb729-c71f-47d1-9755-0310a39db359"
  );
  const [showDepartment, setShowDepartment] = useState(true);
  const handleChangePosition = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedPosition(event.target.value);
    {
      event.target.value === "0" || event.target.value === "3"
        ? [
            setShowDepartment(false),
            setAccountInfo({
              ...accountInfo,
              personalInfo: {
                ...accountInfo.personalInfo,
                position: event.target.value,
                departmentId: "",
              },
            }),
          ]
        : [
            setShowDepartment(true),
            setAccountInfo({
              ...accountInfo,
              personalInfo: {
                ...accountInfo.personalInfo,
                position: event.target.value,
              },
            }),
          ];
    }
  };
  const handleChangeDepartment = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDepartment(event.target.value);
    setAccountInfo({
      ...accountInfo,
      personalInfo: {
        ...accountInfo.personalInfo,
        departmentId: event.target.value,
      },
    });
  };
  const [accountInfo, setAccountInfo] = useState<AccountProps>({
    code: "",
    email: "",
    password: "",
    personalInfo: {
      fullName: "",
      position: "2",
      departmentId: "0f8cb729-c71f-47d1-9755-0310a39db359",
    },
  });
  useEffect(() => {
    if (modal.current) {
      modal.current.open();
    }
  }, []);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(accountInfo);
    setError(false);
    setLoading(true);
    axios
      .post(
        `${SERVER_URI}/accounts`,
        {
          code: accountInfo.code,
          email: accountInfo.email,
          password: accountInfo.password,
          personalInfo: {
            fullName: accountInfo.personalInfo.fullName,
            position: accountInfo.personalInfo.position,
            departmentId: accountInfo.personalInfo.departmentId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(async () => {
        setLoading(false);
        toast.success("Account has been added succesfully!");
        setError(false);
        onClose();
      })
      .catch((error: responseProps<{ data: dataProps<AccountProps> }>) => {
        if (!error.response) {
          toast.error(error.message);
          setLoading(false);
          return;
        }
        const data: dataProps<AccountProps> = error.response.data;
        toast.error(data.message);
        setLoading(false);
      });
  };
  return (
    <Modal ref={modal} onClose={onClose}>
      <div className="px-5 py-4 space-y-3">
        <h2 className="text-3xl mb-5 pb-2 border-b">New Account Information</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <div>
              <Input
                className="w-full"
                label="Full Name:"
                id="fullName"
                name="fullName"
                type="text"
                value={accountInfo.personalInfo.fullName}
                placeholder="Nguyen Van A"
                required
                onChange={(e) => {
                  setAccountInfo({
                    ...accountInfo,
                    personalInfo: {
                      ...accountInfo.personalInfo,
                      fullName: e.target.value,
                    },
                  });
                }}
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
                label="Email:"
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                required
                onChange={(e) => {
                  setAccountInfo({
                    ...accountInfo,
                    email: e.target.value,
                  });
                }}
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
                label="Password:"
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
                onChange={(e) => {
                  setAccountInfo({
                    ...accountInfo,
                    password: e.target.value,
                  });
                }}
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
                label="Account Code:"
                id="code"
                name="code"
                type="text"
                placeholder="PM12345"
                required
                value={accountInfo.code}
                onChange={(e) => {
                  setAccountInfo({
                    ...accountInfo,
                    code: e.target.value,
                  });
                }}
              />
              {error && (
                <p className="pt-1 text-sm text-red-500">
                  Check this input again
                </p>
              )}
            </div>
          </div>
          <div>
            <p>Working Position:</p>
            <div className="pl-10 space-x-10 flex items-center">
              <label>
                <input
                  className="mr-1"
                  checked={selectedPosition === "2"}
                  onChange={handleChangePosition}
                  type="radio"
                  name="Staff"
                  value="2"
                />
                Staff
              </label>
              <label>
                <input
                  className="mr-1"
                  checked={selectedPosition === "1"}
                  onChange={handleChangePosition}
                  type="radio"
                  name="Manager"
                  value="1"
                />
                Manager
              </label>
              <label>
                <input
                  className="mr-1"
                  checked={selectedPosition === "0"}
                  onChange={handleChangePosition}
                  type="radio"
                  name="Factory Director"
                  value="0"
                />
                Factory Director
              </label>
              <label>
                <input
                  className="mr-1"
                  checked={selectedPosition === "3"}
                  onChange={handleChangePosition}
                  type="radio"
                  name="Admin"
                  value="3"
                />
                Admin
              </label>
            </div>
          </div>
          {showDepartment && (
            <div>
              <p>Working Department:</p>
              <div className="pl-10 space-x-10 items-center">
                <label>
                  <input
                    className="mr-1"
                    checked={
                      selectedDepartment ===
                      "0f8cb729-c71f-47d1-9755-0310a39db359"
                    }
                    onChange={handleChangeDepartment}
                    type="radio"
                    value="0f8cb729-c71f-47d1-9755-0310a39db359"
                  />
                  Inspection
                </label>
                <label>
                  <input
                    className="mr-1"
                    checked={
                      selectedDepartment ===
                      "56aeaab3-0dbe-4003-93d6-5961d228dc69"
                    }
                    onChange={handleChangeDepartment}
                    type="radio"
                    value="56aeaab3-0dbe-4003-93d6-5961d228dc69"
                  />
                  Warehouse
                </label>
                <label>
                  <input
                    className="mr-1"
                    checked={
                      selectedDepartment ===
                      "237fadc5-40bc-4f66-b60a-ccea08620b90"
                    }
                    onChange={handleChangeDepartment}
                    type="radio"
                    value="237fadc5-40bc-4f66-b60a-ccea08620b90"
                  />
                  Production
                </label>
              </div>
            </div>
          )}
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
              type="submit"
              className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            >
              {loading ? (
                <CircularProgress color="inherit" size={14} />
              ) : (
                "Confirn"
              )}
            </Button>
          </p>
        </form>
      </div>
    </Modal>
  );
}
