export const isValidPhoneNumber = (value: string): boolean => {
  // react-phone-number-input handles all validation
  // We just check if the value exists and has reasonable length
  return !!value && value.length > 5;
};