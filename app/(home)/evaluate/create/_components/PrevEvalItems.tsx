import { Tables } from "@/app/types/schema";
import { supabase } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

interface Props {
  user: User | null;
  handleSelectedItems: (selectedItems: string[]) => void;
}

const PrevEvalItems = ({ user, handleSelectedItems }: Props) => {
  const [evalItems, setEvalItems] = useState<Tables<"items">[]>([]);
  const [value, setValue] = useState("");
  const [selectedItemsContent, setSelectedItemsContent] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchEvalItems = async () => {
      const { data, error } = await supabase
        .from("evaluation_items")
        .select("*")
        .eq("creator_id", user.id);

      if (!error) {
        setEvalItems(data);
      }
    };
    fetchEvalItems();
  }, [user]);

  const filteredItems = evalItems.filter((item) => item.content.includes(value));

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link">이전 항목 가져오기</Button>
        </DialogTrigger>
        <DialogContent className="min-h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>이전 평가 항목 가져오기</DialogTitle>
            <DialogDescription>이전에 작성한 평가 항목을 불러올 수 있어요.</DialogDescription>
          </DialogHeader>
          <Input
            placeholder="검색어를 입력하세요."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <ScrollArea className="h-[300px]">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id={item.id.toString()}
                  onCheckedChange={(checked) => {
                    return checked
                      ? setSelectedItemsContent([...selectedItemsContent, item.content])
                      : setSelectedItemsContent(
                          selectedItemsContent.filter((content) => content !== item.content),
                        );
                  }}
                />
                <label htmlFor={item.id.toString()}>{item.content}</label>
              </div>
            ))}
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                취소
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                onClick={() => {
                  handleSelectedItems(selectedItemsContent);
                  setSelectedItemsContent([]);
                }}
              >
                불러오기
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PrevEvalItems;
