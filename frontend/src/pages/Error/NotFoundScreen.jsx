import {useNavigate } from "react-router-dom";
import ThemeButton, { colors } from "../../components/ThemeButton";

export default function NotFoundScreen() {
  const navigate = useNavigate();

  return (
    <div>
      <p>404 not found</p>
      <ThemeButton color={colors.BLUE} onClick={() => navigate('/lobby/join')}>Back</ThemeButton>
    </div>
  );
}