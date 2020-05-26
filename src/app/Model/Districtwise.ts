/*District wise Data Model  */
export class Districtwise
{
  confirmed: number;
  recovered: number;
  deceased: number;
  active: number;
  zone: string;
  dailyconfirmed: number;
  district: string;
  statecode: string;
 
  /* Constructor for Districtwise Data` */
 Districtwise(Confirmed: number, Recovered: number, Deceased: number , Active: number, Zone: string , Dailyconfirmed: number, District : string , Statecode: string)
 {
   this.confirmed = Confirmed;
   this.recovered = Recovered;
   this.deceased = Deceased;
   this.active = Active;
   this.zone = Zone;
   this.dailyconfirmed = Dailyconfirmed;
   this.district = District;
   this.statecode = Statecode;
 } 
}