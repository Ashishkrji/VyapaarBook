import { Linking, Alert } from 'react-native';
import { formatPhoneNumber } from './format';

export const sendWhatsAppMessage = async (
  phoneNumber: string,
  message: string
): Promise<boolean> => {
  try {
    const formattedPhone = formatPhoneNumber(phoneNumber).replace('+', '');
    const encodedMessage = encodeURIComponent(message);
    const url = `whatsapp://send?phone=${formattedPhone}&text=${encodedMessage}`;
    
    const supported = await Linking.canOpenURL(url);
    
    if (supported) {
      await Linking.openURL(url);
      return true;
    } else {
      Alert.alert('WhatsApp Not Installed', 'Please install WhatsApp to send messages.');
      return false;
    }
  } catch (error) {
    console.error('Error opening WhatsApp:', error);
    Alert.alert('Error', 'Failed to open WhatsApp.');
    return false;
  }
};

export const makePhoneCall = async (phoneNumber: string): Promise<boolean> => {
  try {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    const url = `tel:${formattedPhone}`;
    
    const supported = await Linking.canOpenURL(url);
    
    if (supported) {
      await Linking.openURL(url);
      return true;
    } else {
      Alert.alert('Error', 'Unable to make phone call.');
      return false;
    }
  } catch (error) {
    console.error('Error making phone call:', error);
    Alert.alert('Error', 'Failed to make phone call.');
    return false;
  }
};

export const checkWhatsAppInstalled = async (): Promise<boolean> => {
  try {
    const url = 'whatsapp://send?text=';
    return await Linking.canOpenURL(url);
  } catch (error) {
    return false;
  }
};
