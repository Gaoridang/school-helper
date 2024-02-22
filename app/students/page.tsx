import React from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";

const StudentsPage = () => {
  return <DataTable columns={columns} data={[]} />;
};

export default StudentsPage;
