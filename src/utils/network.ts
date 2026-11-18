
import NetInfo from '@react-native-community/netinfo';

// Comprueba si el dispositivo tiene acceso a Internet
export const network = async (): Promise<boolean> => {
  const networkState = await NetInfo.fetch();

  return networkState.isConnected !== false && networkState.isInternetReachable !== false;
};
