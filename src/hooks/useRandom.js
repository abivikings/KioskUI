import { useState } from 'react';

export function useRandomString(length) { // It will generate a random string whithin the character set 
  const [randomString, setRandomString] = useState('');

  const generateRandomString = () => {
    const charset = '0123456789';
    // const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+=-][}{|":?><,./;\'`~';
    let generatedString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedString += charset[randomIndex];
    }

    setRandomString(generatedString);
  };

  return { randomString, generateRandomString };

  // example :
  // const { randomString, generateRandomString } = useRandomString(8); // number of character you need, put it inside useRandomString( number )
  // useEffect(() => { generateRandomString() },[])
  // console.log(randomString)

}

export function useRandomPassword() {
    const [password, setPassword] = useState('');
  
    const generateRandomPassword = () => {
      const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      const specialChars = '!@#$%^&*()_+=-][}{|":?><,./;\'`~';
  
      // Ensure at least one character from each category
      const randomLower = lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
      const randomUpper = uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
      const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
      const randomSpecial = specialChars[Math.floor(Math.random() * specialChars.length)];
  
      const allChars = lowercaseChars + uppercaseChars + numbers + specialChars;
      let generatedPassword = randomLower + randomUpper + randomNumber + randomSpecial;
  
      // Generate remaining characters
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        generatedPassword += allChars[randomIndex];
      }
  
      // Shuffle the password to randomize character positions
      const shuffledPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');
      setPassword(shuffledPassword);
    };
  
    return { password, generateRandomPassword };

  // example :
  // const { password, generateRandomPassword } = useRandomPassword(); // it will always generate 8 character password
  // useEffect(() => { generateRandomPassword() },[])
  // console.log(password)
  }