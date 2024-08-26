// src/types/BatchDetails.ts
export interface BatchDetails {
    batchId: number;
    batchName: string;
    programName: string;
    startDate: string;
    endDate: string;
    numberOfTrainees: number;
    active: boolean;
  }
  
  export interface Trainee {
    traineeId: number;
    userName: string;
    email: string;
    percipioEmail: string;
    password: string;
  }
  