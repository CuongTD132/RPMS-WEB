import { useNavigate, useParams } from "react-router-dom";
import MainHeader from "../../components/Navigation/MainHeader";
import Button from "../../components/UI/Button";
import backIcon from "../../assets/back.svg";
import { useEffect, useState } from "react";
import { SERVER_URI } from "../../utils/uri";
import axios from "axios";
import { dataProps, responseProps } from "../Login";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
export type AccountInfoProps = {
  id: string;
  code: string;
  fullName: string;
  email: string;
  position: string;
  status: string;
  createdDate: string;
};
export default function Account() {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<AccountInfoProps>({
    code: "",
    createdDate: "",
    email: "",
    fullName: "",
    id: "",
    position: "",
    status: "",
  });
  const accessToken: string = JSON.parse(sessionStorage.getItem("userToken")!);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const accountId = params.id;
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${SERVER_URI}/accounts/${accountId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(async (response) => {
        const res: dataProps<AccountInfoProps> = response.data;
        setAccount(res.data);
        setLoading(false);
      })
      .catch((error: responseProps<{ data: dataProps<AccountInfoProps> }>) => {
        if (!error.response) {
          toast.error(error.message);
          setLoading(false);
          return;
        }
        const data: dataProps<AccountInfoProps> = error.response.data;
        toast.error(data.message);
        setLoading(false);
      });
  }, [accessToken, accountId]);
  const date = new Date(account.createdDate);
  return (
    <>
      <MainHeader checkLogIn={true} isLogInPage={false} />
      {loading ? (
        <CircularProgress
          className="flex justify-center items-center h-screen"
          color="primary"
          size={50}
        />
      ) : account ? (
        <article className="border rounded-md h-full mt-24 px-5 mx-80 py-5 space-y-8">
          <div className="flex items-center border-b pb-2">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <h2 className="text-3xl">General Info of&nbsp;</h2>
                <h2 className="text-3xl text-yellow-300">{account.fullName}</h2>
              </div>
              <p className="rounded-md bg-blue-500 text-white px-2 text-sm">
                {account.position}
              </p>
            </div>

            <Button
              className="rounded-md border bg-slate-200 border-slate-300 hover:bg-slate-300 px-1 py-1 ml-auto flex items-center"
              onClick={() => navigate(-1)}
            >
              <img className="w-5 h-5" title="Go Back" src={backIcon} />
            </Button>
          </div>
          <ul className="space-y-3">
            <li>Working mail: {account.email}</li>
            <li>Account code: {account.code}</li>
            <li>Working status: {account.status}</li>
            <li>Created date: {date.toLocaleDateString("vie-VN")}</li>
          </ul>
        </article>
      ) : (
        <main id="account-page">
          <div className="items-center justify-center text-center py-52">
            <h1 className="text-4xl text-red-500 py-2">
              Oops! Account with id: &nbsp; <p>{accountId}</p> &nbsp;has not
              been founded!
            </h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <br />
            <div className="flex items-center justify-center">
              <Button
                className="text-xl px-4 py-1 rounded-full text-center items-center flex text-white bg-blue-400 hover:bg-blue-500"
                onClick={goBack}
              >
                Go Back&nbsp;
                {/* <img className="w-5 h-5 " src={home} /> */}
              </Button>
            </div>
          </div>
          <p></p>
        </main>
      )}
    </>
  );
}
