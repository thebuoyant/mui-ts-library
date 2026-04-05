## Password Strength Meter

```
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

export function Example() {
  const handlePasswordChange = (password: string, strengthResult: any) => {
    console.log("password:", password);
    console.log("strengthResult:", strengthResult);

    // Hier kannst du z. B. speichern, validieren oder an ein Formular weitergeben
  };

  return (
    <PasswordStrengthMeter onPasswordChange={handlePasswordChange} />
  );
}
```
