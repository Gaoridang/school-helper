"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpTeacher from "./SignUpTeacher";
import SignUpStudent from "./SignUpStudent";

const SignUpPage = () => {
  return (
    <Tabs defaultValue="teacher" className="max-w-[400px]">
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="teacher">선생님</TabsTrigger>
        <TabsTrigger value="student">학생</TabsTrigger>
        <TabsTrigger value="parents">학부모</TabsTrigger>
      </TabsList>
      <TabsContent value="teacher">
        <Card>
          <CardHeader>
            <CardTitle>선생님 회원가입</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <SignUpTeacher />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="student">
        <Card>
          <CardHeader>
            <CardTitle>학생 회원가입</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <SignUpStudent />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="parents"></TabsContent>
    </Tabs>
  );
};

export default SignUpPage;
