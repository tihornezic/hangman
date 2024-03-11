import Box from "@mui/material/Box";
import { Modal as MuiModal } from "@mui/material";
import { Dispatch, ReactNode } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Modal = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}) => {
  const handleClose = () => setIsOpen(false);

  return (
    <MuiModal open={isOpen} onClose={handleClose}>
      <Box sx={style}>{children}</Box>
    </MuiModal>
  );
};

export default Modal;
