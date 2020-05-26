/*Model class for Resources and essentials data */
export class Resource {

    city: string;
    category: string;
    contact: string;
    phonenumber: string;
    descriptionandorserviceprovided: string;

    /*Constructor for Resources  data */
    Resource(City: string,Category:string,Contact:string,Phonenumber:string,Descriptionandorserviceprovided:string)
    {
       this.city = City;
       this.category = Category;
       this.contact = Contact;
       this.phonenumber = Phonenumber;
       this.descriptionandorserviceprovided = Descriptionandorserviceprovided;
    }
}