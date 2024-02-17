import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ firstName }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <a
      href={`https://minffjkwqtnhftnzdsqc.supabase.co/auth/v1/verify?token=eyJhbGciOiJIUzI1NiIsImtpZCI6IkVjTitxbTFITldyUlF1ZlkiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA4MTYwMzQ5LCJpYXQiOjE3MDgxNTY3NDksImlzcyI6Imh0dHBzOi8vbWluZmZqa3dxdG5oZnRuemRzcWMuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjczNDMwNzUxLTUxYjAtNDcwZS05YzQwLWJjYWJjMDBmNTljMiIsImVtYWlsIjoic3BhcmsxNzI1QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzA4MTM5NzA0fV0sInNlc3Npb25faWQiOiI2MmFmMmJiOC02YTlhLTRhYmEtOWIwYS05MWRmZmI1OWVkODEifQ.ScU-kP3Xi9PcKtHiD7ybM_Jimu78RwbqMdNCPFYM_t8&type=signup&redirect_to=https://www.togethers.info`}
    >
      Confirm your email
    </a>
  </div>
);
