export type AddToTuple<
  T1 extends any[],
  T2,
  T1Length = T1["length"]
> = T1Length extends 0
  ? [T2]
  : T1Length extends 1
  ? [T1[0], T2]
  : T1Length extends 2
  ? [T1[0], T1[1], T2]
  : T1Length extends 3
  ? [T1[0], T1[1], T1[2], T2]
  : T1Length extends 4
  ? [T1[0], T1[1], T1[2], T1[3], T2]
  : T1Length extends 5
  ? [T1[0], T1[1], T1[2], T1[3], T1[4], T2]
  : T1Length extends 6
  ? [T1[0], T1[1], T1[2], T1[3], T1[4], T1[5], T2]
  : T1Length extends 7
  ? [T1[0], T1[1], T1[2], T1[3], T1[4], T1[5], T1[6], T2]
  : T1Length extends 8
  ? [T1[0], T1[1], T1[2], T1[3], T1[4], T1[5], T1[6], T1[7], T2]
  : T1Length extends 9
  ? [T1[0], T1[1], T1[2], T1[3], T1[4], T1[5], T1[6], T1[7], T1[8], T2]
  : T1 extends any[]
  ? [T2]
  : any;

export type MergeTuples<
  T1 extends any[],
  T2 extends any[],
  T2Length = T2["length"]
> = T2Length extends 0
  ? T1
  : T2Length extends 1
  ? AddToTuple<T1, T2[0]>
  : T2Length extends 2
  ? AddToTuple<AddToTuple<T1, T2[0]>, T2[1]>
  : T2Length extends 3
  ? AddToTuple<AddToTuple<AddToTuple<T1, T2[0]>, T2[1]>, T2[2]>
  : T2Length extends 4
  ? AddToTuple<
      AddToTuple<AddToTuple<AddToTuple<T1, T2[0]>, T2[1]>, T2[2]>,
      T2[3]
    >
  : T2Length extends 5
  ? AddToTuple<
      AddToTuple<
        AddToTuple<AddToTuple<AddToTuple<T1, T2[0]>, T2[1]>, T2[2]>,
        T2[3]
      >,
      T2[4]
    >
  : T2Length extends 6
  ? AddToTuple<
      AddToTuple<
        AddToTuple<
          AddToTuple<AddToTuple<AddToTuple<T1, T2[0]>, T2[1]>, T2[2]>,
          T2[3]
        >,
        T2[4]
      >,
      T2[5]
    >
  : T2Length extends 7
  ? AddToTuple<
      AddToTuple<
        AddToTuple<
          AddToTuple<
            AddToTuple<AddToTuple<AddToTuple<T1, T2[0]>, T2[1]>, T2[2]>,
            T2[3]
          >,
          T2[4]
        >,
        T2[5]
      >,
      T2[6]
    >
  : T2Length extends 8
  ? AddToTuple<
      AddToTuple<
        AddToTuple<
          AddToTuple<
            AddToTuple<
              AddToTuple<AddToTuple<AddToTuple<T1, T2[0]>, T2[1]>, T2[2]>,
              T2[3]
            >,
            T2[4]
          >,
          T2[5]
        >,
        T2[6]
      >,
      T2[7]
    >
  : T2Length extends 9
  ? AddToTuple<
      AddToTuple<
        AddToTuple<
          AddToTuple<
            AddToTuple<
              AddToTuple<
                AddToTuple<AddToTuple<AddToTuple<T1, T2[0]>, T2[1]>, T2[2]>,
                T2[3]
              >,
              T2[4]
            >,
            T2[5]
          >,
          T2[6]
        >,
        T2[7]
      >,
      T2[8]
    >
  : T1 extends any[]
  ? T2
  : any;
