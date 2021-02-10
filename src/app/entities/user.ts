export class User {
  id: string;
  displayName: string;
  email: string;
  number: string;
  roles: string[];
  enabled: boolean;
  dataNascita: string;
  password: string;
  matchingPassword: string;
  abbonamento: string;
  dataScadenza: string;
  expired: boolean;
  User(): void{
    this.displayName = "prova"
  }
}
