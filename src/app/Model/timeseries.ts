/*Model for storing daywise data */
export class Timeseries
{
  dailyconfirmed: number;
  dailyrecovered: number;
  dailydeceased: number;
  date: string;
  totalconfirmed: number;
  
  /*Constructor for time series */
  Timeseries(Dailyconfirmed: number , Dailyrecovered: number, Dailydeceased: number, Date: string ,Totalconfirmed: number)
  {
    this.dailyconfirmed = Dailyconfirmed;
    this.dailydeceased = Dailydeceased;
    this.dailyrecovered = Dailyrecovered;
    this.date = Date;
    this.totalconfirmed = Totalconfirmed;
  }

  
}