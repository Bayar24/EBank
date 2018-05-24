export class CustInfo {
    cust_no: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    ssn: string;
    username: string;
    password: string;
    date_of_birth: string;
    contact_phone: number;
    email_address: string;
    sex: string;
    address: { zip: string; state: string; city: string; street: string; no: string }
    constructor() {

    }
}