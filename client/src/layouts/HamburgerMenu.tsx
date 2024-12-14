import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import DialogPopup from "./DialogPopup";
import { useState } from "react";

import AboutPageModal from "./AboutPageModal";
import ContactPageModal from "./ContactPageModal";
import FAQPageModal from "./FAQPageModal";

export function HamburgerMenu() {
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState<boolean>(false);
  const [isFaqDialogOpen, setIsFaqDialogOpen] = useState<boolean>(false);
  const [isContactDialogOpen, setIsContactDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      {/* About modal */}
      <DialogPopup
        isOpen={isAboutDialogOpen}
        setIsOpen={setIsAboutDialogOpen}
        title={"About"}
      >
        <AboutPageModal></AboutPageModal>
      </DialogPopup>

      {/* FAQ modal */}
      <DialogPopup
        isOpen={isFaqDialogOpen}
        setIsOpen={setIsFaqDialogOpen}
        title={"FAQ"}
      >
        <FAQPageModal></FAQPageModal>
      </DialogPopup>

      {/* Contact modal */}
      <DialogPopup
        isOpen={isContactDialogOpen}
        setIsOpen={setIsContactDialogOpen}
        title={"Contact"}
      >
        <ContactPageModal></ContactPageModal>
      </DialogPopup>

      {/* The RHS sheet menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-[#11161D] hover:rounded-lg hover:bg-[#182B40] dark:bg-[#11161D]">
            <i
              className="fa-solid fa-bars fa-xl"
              style={{ color: "#ffffff" }}
            ></i>
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-[#11161D] w-96 dark:bg-[#11161D]">
          <SheetHeader className="mt-16">
            <SheetTitle className="text-right font-vollkorn text-white pr-3 text-xl">
              League Nemesis
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 py-4 mt-4 font-vollkorn text-white">
            <Button
              variant="ghost"
              className="justify-end"
              onClick={() => setIsAboutDialogOpen(true)}
            >
              About
            </Button>
            <Button
              variant="ghost"
              className="justify-end"
              onClick={() => setIsFaqDialogOpen(true)}
            >
              FAQ
            </Button>
            <Button
              variant="ghost"
              className="justify-end"
              onClick={() => setIsContactDialogOpen(true)}
            >
              Contact
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
