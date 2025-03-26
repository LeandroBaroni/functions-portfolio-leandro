type PhoneType = 'tel' | 'residential' | 'fax';

export interface Phone {
  phoneNumber: string;
  type: PhoneType;
}
