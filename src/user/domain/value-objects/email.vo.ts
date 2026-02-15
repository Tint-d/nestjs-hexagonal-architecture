export class Email {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email) {
    return this.value === other.value;
  }
}
