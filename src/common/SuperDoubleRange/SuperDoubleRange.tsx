import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
  LegacyRef
} from "react";
import style from './SuperDoubleRange.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperDoubleRangePropsType = DefaultInputPropsType & {
  onChangeRange: (min: number, max: number) => void
  min: number
  max: number
}

export const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = ({min, max, onChangeRange}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range: LegacyRef<HTMLDivElement> = useRef(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChangeRange(minVal, maxVal);
  }, [minVal, maxVal, onChangeRange]);

  return (
    <div className={style.doubleRange}>
      <div className={style.container}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event: any) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className={style.thumb + ' ' + style.thumbLeft}
          //@ts-ignore
          style={{zIndex: (minVal > max - 100 && "5")}}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event: any) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className={style.thumb + ' ' + style.thumbRight}
        />

        <div className={style.slider}>
          <div className={style.sliderLeftValue}>{minVal}</div>
          <div className={style.sliderTrack}/>
          <div ref={range} className={style.sliderRange}/>
          <div className={style.sliderRightValue}>{maxVal}</div>
        </div>
      </div>
    </div>
  );
};




