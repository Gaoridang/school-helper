import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createRandomCode } from "../classes/utils/getRandomCode";
import { signUpStudent } from "./actions";

const formValues = [
  { label: "이름", value: "name", placeholder: "홍길동" },
  { label: "번호", value: "student_number", placeholder: "12" },
  { label: "학급코드", value: "class_code", placeholder: "선생님께 받은 학급 코드를 입력하세요." },
  { label: "고유번호", value: "code", placeholder: "고유번호를 입력하세요" },
  { label: "비밀번호", value: "password", placeholder: "비밀번호를 입력하세요" },
] as const;

const SignUpStudentSchema = z.object({
  name: z.string().min(1, "이름을 입력하세요."),
  student_number: z.string().min(1, "번호를 입력하세요."),
  password: z.string().min(1, "비밀번호를 입력하세요."),
  code: z.string().min(1, "코드번호를 입력하세요."),
  class_code: z.string().min(1, "학급코드를 입력하세요."),
});

export type SignUpStudentType = z.infer<typeof SignUpStudentSchema>;

const SignUpStudent = () => {
  const initialCode = createRandomCode("student");
  const form = useForm<SignUpStudentType>({
    resolver: zodResolver(SignUpStudentSchema),
    defaultValues: {
      name: "",
      student_number: "",
      class_code: "",
      code: initialCode,
      password: initialCode,
    },
  });

  const onSubmit = (data: SignUpStudentType) => {
    signUpStudent(data);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        {formValues.map((value) => (
          <FormField
            key={value.value}
            name={value.value}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{value.label}</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={value.placeholder}
                      disabled={value.value === "code" || value.value === "password"}
                      className="disabled:bg-gray-200"
                    />
                  </FormControl>
                  {value.value === "code" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const newRandomCode = createRandomCode("student");
                        form.setValue("code", newRandomCode);
                        form.setValue("password", newRandomCode);
                      }}
                    >
                      고유번호 재생성
                    </Button>
                  )}
                  {value.value === "name" && (
                    <Button type="button" variant="outline" disabled>
                      @student.com
                    </Button>
                  )}
                </div>
                {value.value === "password" && (
                  <FormDescription>비밀번호는 고유번호와 동일합니다.</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">회원가입</Button>
      </form>
    </Form>
  );
};

export default SignUpStudent;
