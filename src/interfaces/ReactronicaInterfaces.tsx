import { StepType } from "reactronica";

export interface ITrackProps {
    steps:StepType[]
}

export interface INote {
    name: string;
    duration: number;
}