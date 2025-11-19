import { jobs } from "@/lib/data";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { PostJobDialog } from "./_components/post-job-dialog";

export default function RecruiterJobsPage() {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between space-y-2">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Job Postings</h1>
            <p className="text-muted-foreground">Manage your company&apos;s open positions.</p>
        </div>
        <PostJobDialog />
      </div>
      
      <DataTable columns={columns} data={jobs} />
    </div>
  );
}
