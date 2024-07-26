import AccountItem from "./AccountItem";
export type AccountsProps = {
  id: string;
  code: string;
  email: string;
  position: string;
  status: string;
};
export default function AccountsList({
  accounts,
}: {
  accounts: AccountsProps[];
}) {
  // Sau nay sua lai API gop Account voi Staff infor chung mot list

  return (
    <table id="table" className="w-8/12">
      <thead>
        <tr>
          <th>Account Code</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account: AccountsProps) => (
          <tr className="hover:bg-slate-200" key={account.id}>
            <AccountItem {...account} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
