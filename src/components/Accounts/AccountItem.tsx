import Button from "../UI/Button";
// import editAccount from "../../assets/edit-profile.svg";
import banAccount from "../../assets/user-ban.svg";
import { useState } from "react";
// import PositionChange from "./PositionChange";
import StatusChange from "./StatusChange";
import { AccountsProps } from "./AccountsList";

export default function AccountItem({
  id,
  code,
  email,
  status,
}: AccountsProps) {
  // const [isChangeRole, setIsChangeRole] = useState(false);
  const [isChangeStatus, setIsChangeStatus] = useState(false);
  // function handleStartChanging() {
  //   setIsChangeRole(true);
  // }
  // function handleCancelChanging() {
  //   setIsChangeRole(false);
  // }
  function handleStartChangingStatus() {
    setIsChangeStatus(true);
  }
  function handleCancelChangingStatus() {
    setIsChangeStatus(false);
  }
  return (
    <>
      {/* {isChangeRole && ( 
        <PositionChange
          position={position}
          // firstName={firstName}
          // lastName={lastName}
          onClose={handleCancelChanging}
        />
      )} */}
      {isChangeStatus && (
        <StatusChange
          status={status}
          email={email}
          id={id}
          onClose={handleCancelChangingStatus}
        />
      )}
      <td>{code}</td>
      <td>
        <Button className="text-blue-500 hover:text-blue-700" to={id}>
          {email}
        </Button>
      </td>
      {status === "Active" ? (
        <td className="text-green-500">{status}</td>
      ) : (
        <td className="text-yellow-500">{status}</td>
      )}
      <td className="w-20 pr-2 space-x-1">
        {/* <Button
          onClick={handleStartChanging}
          title="Change Role"
          className="border bg-white hover:bg-amber-100 rounded-full p-1"
        >
          <img className="w-5 h-5" src={editAccount} />
        </Button> */}
        <Button
          onClick={handleStartChangingStatus}
          title="Ban/Unban Account"
          className="border bg-white hover:bg-amber-100 rounded-full p-1"
        >
          <img className="w-5 h-5" src={banAccount} />
        </Button>
      </td>
    </>
  );
}
