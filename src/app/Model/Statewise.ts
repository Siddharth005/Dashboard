/*Model class for statewise data */
export class Statewise
{
  confirmed: number;
  recovered: number;
  deaths: number;
  active: number;
  state: string;
  dailyconfirmed: number;
  statecode: string;

  /*Constructor for statewise model */
  Statewise(Confirmed: number, Recovered: number , Deaths: number, Active:number, State: string , Dailyconfirmed:number,Statecode: string  )
  {
    this.confirmed = Confirmed;
    this.recovered = Recovered;
    this.deaths = Deaths;
    this.active = Active;
    this.state = State;
    this.dailyconfirmed = Dailyconfirmed;
    this.statecode = Statecode;
  }

}