import { Platform } from 'react-native';

export const fonts = {
  jersey15: {
    regular: Platform.select({
      ios: 'Jersey15',
      android: 'Jersey15-Regular',
    }),
  },
}; 