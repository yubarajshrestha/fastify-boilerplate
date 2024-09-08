/**********************************
 * * Generate random code without special characters (0-9, A-Z)
 * @param length
 * @returns string
 **********************************/
export function generateCode(length: number) {
  const characters = "ABCDEFGHJKMNPQRSTUVWXYZ123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**********************************
 * * Generate random password with special characters (0-9, A-Z, !@#$%^&*()_-+={}[]|;:,.<>?)
 * @param length
 * @returns string
 **********************************/
export const generatePassword = (
  length: number = 10,
  difficult: boolean = true
) => {
  const complex =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+={}[]|;:,.<>?";
  const easy = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charset = difficult ? complex : easy;
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

/**********************************
 * * Slugify text
 * @param text
 * @returns string
 **********************************/
export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

/**********************************
 * * Fix the invalid json string and parse it
 * @param text
 * @returns object
 **********************************/
/* istanbul ignore next */
export const parseJSON = (jsonString: string) => {
  const stack: string[] = [];
  let currentChar = "";
  let prevChar = "";
  let isString = false;
  let isEscaping = false;

  for (let i = 0; i < jsonString.length; i++) {
    currentChar = jsonString[i];

    if (!isEscaping) {
      if (currentChar === '"') {
        isString = !isString;
      } else if (!isString) {
        if (currentChar === "{" || currentChar === "[") {
          stack.push(currentChar);
        } else if (currentChar === "}" || currentChar === "]") {
          if (stack.length === 0) {
            // Add an opening brace or bracket if missing
            jsonString =
              prevChar === ":"
                ? currentChar + jsonString
                : "," + currentChar + jsonString;
          } else {
            // Pop matching opening brace or bracket
            const lastOpen = stack.pop();
            jsonString += currentChar;

            if (
              (currentChar === "}" && lastOpen !== "{") ||
              (currentChar === "]" && lastOpen !== "[")
            ) {
              // Mismatched braces or brackets; add missing comma
              jsonString += ",";
            }
          }
        } else if (currentChar === ":" && stack[stack.length - 1] === "{") {
          jsonString += currentChar;
        }
      }
    }

    if (isString) {
      if (currentChar === "\\" && prevChar !== "\\") {
        isEscaping = true;
      } else if (currentChar === '"' && prevChar !== "\\") {
        isEscaping = false;
      }
    }

    prevChar = currentChar;
  }

  // Add missing closing braces or brackets
  while (stack.length > 0) {
    const openChar = stack.pop();
    const closeChar = openChar === "{" ? "}" : "]";
    jsonString += closeChar;
  }

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error("Invalid JSON");
  }
};

export const validPhonePattern = new RegExp(
  /^(98[4-6]\d{7}|97[7-9]\d{7}|98[0-3]\d{7})$/
);
