import { Outlet } from 'react-router-dom';
import { MapCreatorContextProvider } from '../../context/MapCreatorContextProvider';

export default function SetupLayout() {
  return (
    <MapCreatorContextProvider>
      <Outlet></Outlet>
    </MapCreatorContextProvider>
  );
}