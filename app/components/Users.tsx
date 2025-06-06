"use client"
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, } from "../../redux/store"
import { getUsers, addUser, updateUser, UserState, deleteUser } from '@/redux/usersSlice';
import { deleteUserLocally ,updateUserLocally} from '@/redux/usersSlice';
import { IsLogin, UserLoginContext } from '@/contexts/IsUserLogin'
import swal from 'sweetalert'
import { useRouter } from 'next/navigation'
//mui package
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { IconButton } from '@mui/material';
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import UserInfoModal from './UserInfoModal';
import UserEditModal from './UserUpdateModal';
interface Column {
  id: "id" | "نام" | "ایمیل" | "پروفایل" | "عملیات";
  label: string;
  minWidth?: number;
  align?: "right";
}
const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 50, align: "right" },
  { id: "نام", label: "نام", minWidth: 170, align: "right" },
  { id: "ایمیل", label: "ایمیل", minWidth: 200, align: "right" },
  { id: "پروفایل", label: "پروفایل", minWidth: 100, align: "right" },
  { id: "عملیات", label: "عملیات", minWidth: 170, align: "right" },
];
export interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
export const Users = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const usersData = useSelector((state: UserState) => state.users.users);
  const newUsersData = useSelector((state: UserState) => state.users.filterUsers);
  const LoginContext = useContext<UserLoginContext | null>(IsLogin)
  //user info modal state
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  //user update modal state
  const [selectedUserToEdit, setSelectedUserToEdit] = useState<UserData | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  useEffect(() => {
    dispatch(getUsers())
    // get isLogin from localStorage
    //is login auth
    if (localStorage.getItem("isLoginStorage")) {
      LoginContext?.setIsLogin(true)
    } else if (!LoginContext?.isLogin) {
      swal({
        title: 'خطای دسترسی !',
        text: 'برای دسترسی به پنل ابتدا وارد سایت شوید .',
        icon: 'warning',
        buttons: {
          login: { text: 'ورود', value: 'login' },
          register: { text: 'ثبت نام ', value: 'register' },
        },
      }).then((value) => {
        if (value === 'login') {
          router.push('/login'); // Redirects to Login
        } else if (value === 'register') {
          router.push('/register'); // Redirects to Register
        }
      })
    }
    if (usersData.error) {
      swal({
        title: "خطا!",
        text: usersData.error,
        icon: "error",
      });
    }
  }, [])
  //mui table logic
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2); // Show 2 users per page

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // Actions 
  //update
const openEditModal = (user: UserData) => {
  setSelectedUserToEdit(user);
  setEditModalOpen(true);
};
const handleUserUpdate = (updatedUser: UserData) => {
  console.log("کاربر بروزرسانی شد:", updatedUser);
  
   dispatch(updateUserLocally(updatedUser)); 
};
//delete
  const handleDelete = (userId: number) => {
    dispatch(deleteUser(userId))
    dispatch(deleteUserLocally(userId));
  };
  // read
  const handleMoreInfo = (user: UserData) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  //reload
  const reloadPageHandler = ()=>{
      window.location.reload();
  }
  return (
    <div className='container'>
      <Paper sx={{ width: "100%", overflow: "hidden" }} >
         <button className='m-5 cursor-pointer bg-blue-600 px-5 py-2 rounded-2xl text-white'  onClick={reloadPageHandler}>بازنشانی</button>
        <TableContainer sx={{ direction: "rtl", maxHeight: 440 }}>
          <Table stickyHeader aria-label="rtl table">
            <TableHead>
              <TableRow className='bg-lime-500 '>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {LoginContext?.isLogin ? newUsersData && newUsersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user: UserData) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                  <TableCell align="right" className='bg-lime-100 '>{user.id}</TableCell>
                  <TableCell align='right' className='bg-lime-200' >{`${user.first_name} ${user.last_name}`}</TableCell>
                  <TableCell align='right' className='bg-lime-300' >{user.email}</TableCell>
                  <TableCell align="right" className='bg-lime-400' >
                    <Avatar src={user.avatar} alt={user.first_name} />
                  </TableCell>
                  <TableCell align="right" className='bg-lime-100'>
                    <Stack direction="row" className='gap-2'>
                      <Button variant="outlined" color="primary" onClick={() => openEditModal(user)}>ویرایش</Button>
                      <Button variant="outlined" color="success" onClick={() => handleMoreInfo(user)}>اطلاعات کاربر</Button>
                      <Button variant="outlined" color="error" onClick={() => handleDelete(user.id)}>حذف</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              )) : null}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ direction: "rtl", textAlign: "right" }}
          rowsPerPageOptions={[2, 4, 8]}
          component="div"
          count={newUsersData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={() => (
            <div style={{ direction: "rtl" }} className='flex flex-row'>
              <IconButton onClick={(event) => handleChangePage(event, page - 1)} disabled={page === 0}>
                <KeyboardArrowRightIcon />
              </IconButton>
              <IconButton onClick={(event) => handleChangePage(event, page + 1)} disabled={page >= Math.ceil(newUsersData.length / rowsPerPage) - 1}>
                <KeyboardArrowLeftIcon />
              </IconButton>
            </div>
          )}
          labelRowsPerPage="تعداد سطر در هر صفحه:"
        />
      </Paper>
      <UserInfoModal open={modalOpen} onClose={() => setModalOpen(false)} user={selectedUser!} />
     <UserEditModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} userDetails ={selectedUserToEdit!} onSubmit={handleUserUpdate} />
    </div>
  )
}

