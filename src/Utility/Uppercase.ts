type Greeting = 'hello'
type Gender = 'Male' | 'Female'

type ShoutingGreeting = Uppercase<Greeting>
// type ShoutingGender = Uppercase<Gender>
// type ShoutingGender = Lowercase<Gender>
// type ShoutingGender = Capitalize<Gender>
type ShoutingGender = Uncapitalize<Gender>
// type ShoutingGreeting = "HELLO";
