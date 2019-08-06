export class PickingSecondInfoModel {
  id: number;
  pickingNumber: string;
  finishedTime?: Date;
  isFinshed: boolean;
  packageCount: number;
  basketStatus: SecondPickingBasketLocation[]
}

export class SecondPickingBasketLocation {
  basketNo: string;
  packageId: number;
  packageNumber: string;
  isFinished: boolean;
  isPickingFailed: boolean;
}
