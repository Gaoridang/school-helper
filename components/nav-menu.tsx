"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { User } from "@/app/utils/getUserInfo";

const NavMenus = ({ data }: { data: User | null }) => {
  return (
    <div className="p-2 border-b">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>HOME</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>학생 관리</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem href="/students/add" title="학생 등록">
                  우리반 학생 등록하기
                </ListItem>
                <ListItem href="/students" title="전체 학생">
                  전체 학생 관리
                </ListItem>
                <ListItem href="/students" title="특별 학생">
                  관심이 필요한 학생 관리
                </ListItem>
                <ListItem href="/assessment/create" title="평가지">
                  행동 점검 체크리스트 템플릿 제작
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {!data ? (
            <>
              <NavigationMenuItem>
                <Link href="/signin" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    로그인
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/signup" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    회원가입
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </>
          ) : (
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {data.role === "teacher" ? (
                  <span>
                    {data.user.school} {data.user.grade} {data.user.class_number}
                  </span>
                ) : (
                  <span>{data.user.name}</span>
                )}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 w-[200px]">
                  <ListItem href="/profile" title="프로필">
                    프로필
                  </ListItem>
                  <ListItem href="/signout" title="로그아웃">
                    로그아웃
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                고객문의
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavMenus;

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
