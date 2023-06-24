import './App.css'
import { Route, Routes } from 'react-router-dom'
import ABS_PATHS from './pages/routes'

import PageLayout from './components/PageLayout'
import GameBackground from './components/GameBackground'

import MenuScreen from './pages/Menu/MenuScreen'

import JoinLobbyScreen from './pages/Lobby/JoinLobbyScreen';
import LobbyScreen from './pages/Lobby/LobbyScreen';
import SetupLobbyScreen from './pages/Lobby/SetupLobbyScreen';

import MainGameScreen from './pages/Game/MainGameScreen'
import GameObjectiveScreen from './pages/Game/GameObjectiveScreen'
import GameOverScreen from './pages/Game/GameOverScreen'
import LeaderboardScreen from './pages/Game/LeaderboardScreen'

import SetupLayout from './pages/MapCreation/SetupLayout'
import SetupMapScreen from './pages/MapCreation/SetupMapScreen'
import CreateObjectiveScreen from './pages/MapCreation/CreateObjectiveScreen'
import ConfirmMapScreen from './pages/MapCreation/ConfirmMapScreen'
import MapObjectivesScreen from './pages/MapCreation/MapObjectivesScreen'
import EditObjectiveScreen from './pages/MapCreation/EditObjectiveScreen'
import GameContextLayout from './context/GameContextLayout'
import StartLobbyScreen from './pages/Lobby/StartLobbyScreen'
import NotFoundScreen from './pages/Error/NotFoundScreen'


function App() {

  return (
    <>
      <GameBackground />
      <Routes>
        <Route path={ABS_PATHS.MENU} element={<PageLayout />}>
          <Route index element={<MenuScreen />}/>
          <Route path="lobby">
            <Route index path="join" element={<JoinLobbyScreen />} />
            <Route path=":id/:name/" element={<LobbyScreen />} />
            <Route path="setup/:mapId?" element={<SetupLobbyScreen />} />
            <Route path=":id/start" element={<StartLobbyScreen />} />
          </Route>
          <Route path="game/:id/:name" element ={<GameContextLayout/>}>
            <Route index element={<MainGameScreen />} />
            <Route path=":objective" element={<GameObjectiveScreen />} />
            <Route path="end" element={<GameOverScreen />} />
            <Route path="leaderboard" element={<LeaderboardScreen />} />
            <Route path="noLobby" element={<NotFoundScreen/>}/>
          </Route>
          <Route path="map" element={<SetupLayout />}>
            <Route index path="setup" element={<SetupMapScreen />} />
            <Route path="upload" element={<CreateObjectiveScreen />} />
            <Route path="objectives" element={<MapObjectivesScreen />} />
            <Route path="objectives/:id" element={<EditObjectiveScreen />} />
            <Route path="confirm/:id" element={<ConfirmMapScreen />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App