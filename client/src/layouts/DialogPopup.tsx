import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DialogPopup({
  children,
  isOpen,
  setIsOpen,
  title,
  description,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description?: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[#11161D] text-white font-vollkorn-para sm:max-w-[50rem] p-14">
        <DialogHeader>
          <DialogTitle className="text-white text-left">
            <h1 className="text-xl">{title}</h1>
            <hr className="mb-2 mt-2" />
          </DialogTitle>
          {description && (
            <DialogDescription className="text-white text-left">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default DialogPopup;
