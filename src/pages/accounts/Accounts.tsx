import MainHeader from "../../components/Navigation/MainHeader";
import Button from "../../components/UI/Button";
import AccountsList, {
  AccountsProps,
} from "../../components/Accounts/AccountsList";
import { useEffect, useState } from "react";
import AddAccount from "../../components/Accounts/NewAccount";
import Input from "../../components/UI/Input";
import axios from "axios";
import { SERVER_URI } from "../../utils/uri";
import { dataProps, responseProps } from "../Login";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

export default function Accounts() {
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<AccountsProps[]>([]);
  const accessToken: string = JSON.parse(sessionStorage.getItem("userToken")!);
  function handleStartAdding() {
    setIsAdding(true);
  }
  function handleCancelAdding() {
    setIsAdding(false);
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${SERVER_URI}/accounts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(async (response) => {
        const res: dataProps<AccountsProps[]> = response.data;
        setAccounts(res.data);
        setLoading(false);
      })
      .catch((error: responseProps<{ data: dataProps<AccountsProps[]> }>) => {
        console.log(error);
        if (!error.response) {
          toast.error(error.message);
          setLoading(false);
          return;
        }
        const data: dataProps<AccountsProps[]> = error.response.data;
        toast.error(data.message);
        setLoading(false);
      });
  }, [accessToken]);

  return (
    <>
      <MainHeader isLogInPage={false} checkLogIn={true} />
      {isAdding && <AddAccount onClose={handleCancelAdding} />}
      <div className="h-full px-5 py-5 space-y-10">
        <div className="flex items-center">
          <h2 className="text-3xl">Manage Accounts</h2>
          <div className="ml-auto flex items-center space-x-10">
            <div className="px-2 py-1 border border-gray-400 rounded-md">
              <Input
                label=""
                id="search"
                className="outline-none w-80"
                name="Search box"
                type="text"
                placeholder="Search"
              />
            </div>
            <Button
              onClick={handleStartAdding}
              className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Account +
            </Button>
          </div>
        </div>

        {loading ? (
          <CircularProgress
            className="flex justify-center items-center h-screen"
            color="primary"
            size={50}
          />
        ) : (
          <AccountsList accounts={accounts} />
        )}
      </div>
    </>
  );
}
