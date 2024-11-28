import { sha256 } from 'js-sha256'; // Import the sha256 function from the js-sha256 library

export const securityUtils = {
  // Encode text to Base64
  encode(text: string): string {
    return btoa(text);
  },

  // Decode text from Base64
  decode(text: string): string {
    return atob(text);
  },

  // Hash text synchronously using SHA-256
  hash(text: string): string {
    return sha256(text); // Returns the hash as a hexadecimal string
  },
};
