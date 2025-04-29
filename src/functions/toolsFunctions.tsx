export const Dist = (xA:number, xB:number, yA:number, yB:number) => {
    return Math.sqrt(Math.pow(xA - xB,2) + Math.pow(yA - yB,2))
}