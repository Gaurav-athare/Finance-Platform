// app/account/[id]/page.jsx

export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { AccountChart } from "../_components/account-chart";
import { TransactionTable } from "../_components/transaction-table";
import { getAccountWithTransactions } from "@/actions/account";

export default async function AccountPage({ params }) {
  const accountId = await params.id; // ✅ safe to use directly here in this function

  const accountData = await getAccountWithTransactions(accountId);

  if (!accountData) notFound();

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ₹{parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      <Suspense fallback={<BarLoader className="mt-4" width="100%" color="#9333ea" />}>
        <AccountChart transactions={transactions} />
      </Suspense>

      <Suspense fallback={<BarLoader className="mt-4" width="100%" color="#9333ea" />}>
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
}
