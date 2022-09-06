import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import style from './SuperDoubleRange.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperDoubleRangePropsType = DefaultInputPropsType & {
  onChangeRange: (min: number, max: number) => void
  min: number
  max: number
}

const SuperDoubleRangeHidden: React.FC<SuperDoubleRangePropsType> = ({min, max, onChangeRange}) => {

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  useEffect(() => {
    setMaxVal(max)
    setMinVal(min)
  }, [min,max])

  let minValRef = useRef(minVal)
  let maxValRef = useRef(maxVal);


  const range: LegacyRef<HTMLDivElement> = useRef(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal]);

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal]);

  useEffect(() => {
    onChangeRange(minVal, maxVal);
  }, );


  return (
    <div className={style.doubleRange}>
      <div className={style.container}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className={style.thumb + ' ' + style.thumbLeft}
          style={{zIndex: (minVal > maxVal - 100 ? "5" : undefined)}}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
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

export const SuperDoubleRange = React.memo(SuperDoubleRangeHidden)





