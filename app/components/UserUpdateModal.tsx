import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { UserData } from "./Users";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userDetails: UserData;
  onSubmit: (updatedUser: UserData) => void;
}

const UserEditModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, userDetails, onSubmit }) => {
  if (!userDetails) return null;

  const [editFormData, setEditFormData] = useState<UserData>({
    id: userDetails.id,
    email: userDetails.email,
    first_name: userDetails.first_name,
    last_name: userDetails.last_name,
    avatar: userDetails.avatar,
  });

useEffect(() => {
  if (userDetails) {
    setEditFormData(userDetails); 
  }
}, [userDetails]);

 


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData({ ...editFormData, [event.target.name]: event.target.value });
  };

const handleSaveChanges = () => {
  console.log("Updating user...");
  setTimeout(() => {
    onSubmit(editFormData);
    onClose();
  }, 100); // ✅ تأخیر بسیار کم برای جلوگیری از lag در رویداد
};


  return (
   <Dialog open={Boolean(isOpen)} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="bg-green-500 text-white text-lg font-semibold text-right">
        ویرایش اطلاعات کاربر
      </DialogTitle>
      <DialogContent className="p-6 flex flex-col gap-6">
        <div className="flex justify-center">
          <Avatar src={editFormData.avatar} alt={editFormData.email} className="w-44 h-44 mb-6 border-4 border-gray-400 rounded-full" />
        </div>

        <TextField 
          label="نام" 
          name="first_name" 
          placeholder="نام را وارد کنید"
          value={editFormData.first_name} 
          onChange={handleInputChange} 
          fullWidth 
          InputProps={{ style: { textAlign: "right" } }}
        />

        <TextField 
          label="نام خانوادگی" 
          name="last_name" 
          placeholder="نام خانوادگی را وارد کنید"
          value={editFormData.last_name} 
          onChange={handleInputChange} 
          fullWidth 
          InputProps={{ style: { textAlign: "right" } }}
        />

        <TextField 
          label="ایمیل" 
          name="email" 
          placeholder="ایمیل را وارد کنید"
          value={editFormData.email} 
          onChange={handleInputChange} 
          fullWidth 
          InputProps={{ style: { textAlign: "right" } }}
        />
      </DialogContent>
      <DialogActions className="bg-gray-100 p-4 flex justify-between">
        <Button onClick={onClose} className="bg-red-500 text-white hover:bg-white hover:text-red-500 border border-red-500 transition-all duration-300 px-4 py-2 rounded-md">
          لغو
        </Button>
        <Button onClick={handleSaveChanges} className="bg-green-500 text-white hover:bg-white hover:text-green-500 border border-green-500 transition-all duration-300 px-4 py-2 rounded-md">
          ذخیره تغییرات
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserEditModal;
