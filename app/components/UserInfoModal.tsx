import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

interface UserData {
  id: number | string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user: UserData;
}

const UserInfoModal: React.FC<UserModalProps> = ({ open, onClose, user }) => {
    if (!user) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="bg-lime-400 text-white text-lg font-semibold flex justify-between items-center modalUserInfo__header">
      <span className="modalUserInfo__title">
        اطلاعات کاربر
        </span>  
        
      </DialogTitle>
      <DialogContent className="p-4 flex flex-col items-center ">
        <Avatar src={user.avatar} alt={user.first_name} className=" mb-4 border-4 modalUserInfo__profile border-gray-300 rounded-full"/>
        <div className="text-gray-700 text-lg">
          <p><strong>نام:</strong> {user.first_name}</p>
          <p><strong>نام خانوادگی:</strong> {user.last_name}</p>
          <p><strong>ایمیل:</strong> {user.email}</p>
        </div>
      </DialogContent>
      <DialogActions className="bg-gray-100 p-3">
        <Button onClick={onClose} className="bg-gray-500 text-white">
          <span className="text-amber-500 px-3 py-2  hover:bg-orange-400 transition-colors hover:text-white rounded-2xl">
            بستن 
            </span>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserInfoModal;

