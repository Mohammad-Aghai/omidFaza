import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersApi, createUserApi, deleteUserApi, updateUserApi, signInUserApi, signUpUserApi } from "@/services/api";
import { current } from "immer";
import { UserData } from "@/app/components/Users";
export interface User {
  id?: string | number;
  email: string;
  password: string;
}
export interface UserState {
  users: User[] | any;
  loading: boolean;
  error: any | null;
  filterUsers: User[] | any;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  filterUsers: [],
};




// login user
export const userSignin = createAsyncThunk("users/userSignin", async (user: { email: string, password: string }, { rejectWithValue }) => {
  try {
    return await signInUserApi(user);
  } catch (error) {
    return rejectWithValue(error);
  }
});


// Register user
export const userRegister = createAsyncThunk("users/userRegister", async (user: {  email: string, password: string }, { rejectWithValue }) => {
  try {
    return await signUpUserApi(user);
  } catch (error) {
    return rejectWithValue(error);
  }
});

// get users list 
export const getUsers = createAsyncThunk("users/getUsers", async (_, { rejectWithValue }) => {
  try {
    return await fetchUsersApi();
  } catch (error) {
    return rejectWithValue(error);
  }
});


// create user 
export const addUser = createAsyncThunk("users/addUser", async (user: { id: string, email: string, password: string }, { rejectWithValue }) => {
  try {
    return await createUserApi(user);
  } catch (error) {
    return rejectWithValue(error);
  }
});

// update user
export const updateUser = createAsyncThunk("users/updateUser", async (user: UserData, { rejectWithValue }) => {
  try {
    return await updateUserApi(user);
  } catch (error) {
    return rejectWithValue(error);
  }
});

// delete user 
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string | number, { rejectWithValue }) => {
    try {
      await deleteUserApi(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : { message: "خطای ناشناخته" });
    }
  }
);



//slicing
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUserLocally: (state, action) => {

      state.filterUsers = state.filterUsers.filter((user: User) => user.id !== action.payload);
    },
    updateUserLocally: (state, action) => {
      const index = state.filterUsers.findIndex((user: UserData) => user.id === action.payload.id);
      if (index !== -1) {
        state.filterUsers[index] = { ...state.filterUsers[index], ...action.payload };
      }
     
      const usersIndex = state.users.data.findIndex((user: UserData) => user.id === action.payload.id);
      if (usersIndex !== -1) {
        state.users[usersIndex] = { ...state.users[usersIndex], ...action.payload };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filterUsers = action.payload.data;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("User updated successfully ,updated user information:", JSON.stringify(action.payload, null, 2));
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        console.log("user deleted successfully userId : " + action.payload);


      })
      .addCase(userSignin.fulfilled, (state, action) => {
        state.users = action.payload;
        state.error = null
      })
      .addCase(userSignin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignin.rejected, (state, action) => {
        state.loading = false;
        state.error = "Rejected";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});
export default userSlice.reducer
export const { deleteUserLocally,updateUserLocally } = userSlice.actions;