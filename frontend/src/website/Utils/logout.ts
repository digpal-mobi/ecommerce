import { logoutSuccess } from "@/redux/slices/authSlice";
import { clearCart } from "@/redux/slices/cartSlice";
import type { AppDispatch } from "@/redux/store";
import { deleteCookie } from "@/website/Helpers/Helper";
import { LogoutUser } from "@/website/Utils/Api";

export async function logoutSession(dispatch: AppDispatch) {
  await LogoutUser();

  deleteCookie("USER_ACCESS");
  deleteCookie("USER_RefreshToken");
  deleteCookie("USER_DATA");
  dispatch(logoutSuccess());
  dispatch(clearCart());
}
