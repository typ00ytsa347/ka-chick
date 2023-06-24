import { useNavigate } from "react-router-dom";
import ThemeButton, { colors } from "./ThemeButton";

export default function NavigateAlertButton({
    children="Back to Menu",
    path='/', 
    message="Are you sure you want to go back to menu?"
  }) {

  const navigate = useNavigate();

  function alertNavigate() {
    let exitConfirm = confirm(message)
  
    if (exitConfirm) {
      navigate(path);
    }
  }

  return (
    <ThemeButton color={colors.PINK} onClick={alertNavigate}>{children}</ThemeButton>
  );
}