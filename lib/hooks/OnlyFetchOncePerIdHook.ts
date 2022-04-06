import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useOnlyFetchOncePerIdHook<ValueType>(
  initValueIds: Set<string>,
  fetchValue: (valueId: string) => Promise<ValueType>
): [Map<string, ValueType> | undefined, Dispatch<SetStateAction<Set<string>>>] {
  const [valueIds, setValueIds] = useState<Set<string>>(initValueIds);
  const [values, setValues] = useState<Map<string, ValueType> | undefined>(
    undefined
  );

  useEffect(() => {
    if (!values) {
      const valueIdsTemp = [...valueIds];

      const valuesTemp = new Map<string, ValueType>();
      valueIdsTemp.map(async (valueId) => {
        const value = await fetchValue(valueId);
        setValues(() => {
          valuesTemp.set(valueId, value);
          return new Map(valuesTemp);
        });
      });
    }
  }, [fetchValue, valueIds, values]);
  return [values, setValueIds];
}
