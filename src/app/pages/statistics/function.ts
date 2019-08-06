export function findBigSmallvalue(list: Array<any>, key: string) {
  let biggest = list[0][key];
  let biggestindex = [0];
  let smallest = list[0][key];
  let smallestindex = [0];
  list.forEach((value, index) => {
    if (biggest < value[key]) {
      biggest = value[key];
      biggestindex[0] = index;
    }
    if (smallest > value[key]) {
      smallest = value[key];
      smallestindex[0] = index;
    }
  });
  list.forEach((value, index,array) => {
    if(value[key]==array[biggestindex[0]][key]){
      biggestindex.push(index);
    }
    if(value[key]==array[smallestindex[0]][key]){
      smallestindex.push(index);
    }
  });
  return {biggestindex: biggestindex, smallestindex: smallestindex};
}
