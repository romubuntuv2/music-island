
export interface IInstr3D {
    instrumentType:string,
    modelType:string
}

export interface IGrabItem {
    instr3D:IInstr3D,
    initX:number,
    initZ:number
}