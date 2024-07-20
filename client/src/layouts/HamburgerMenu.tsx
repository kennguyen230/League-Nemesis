import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function HamburgerMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <i
            className="fa-solid fa-bars fa-xl"
            style={{ color: "#ffffff" }}
          ></i>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-[#11161D] w-96">
        <SheetHeader className="mt-16">
          <SheetTitle className="text-right font-vollkorn text-white pr-3 text-xl">
            League Nemesis
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4 mt-4 font-vollkorn text-white">
          <Button variant="ghost" className="justify-end">
            About
          </Button>
          <Button variant="ghost" className="justify-end">
            Contact
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
