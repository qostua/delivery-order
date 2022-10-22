import {
  setCursorStyle,
  preventSelection
} from './utils.js';

const NUMBER_SLIDER_STEPS = 21;
const START_ORDER_TIME = '10:00';
const PERIOD_DURATION = '02:00';
const SLIDER_STEP_DURATION = '00:20';

const TimeSettings = {
  MINUTE_IN_HOUR: 60,
  TIME_FORMATE: 24,
  TIME_VALUE_LENGTH: 2,
};

const getMinutesDurationFromTime = (time = '00:00') => {
  const [hours, minutes] = time.split(':');
  return Number(hours) * TimeSettings.MINUTE_IN_HOUR + Number(minutes);
};
const getTimeFromMinutesDuration = (minutesDuration) => {
  const hours = Math.floor(minutesDuration / TimeSettings.MINUTE_IN_HOUR) % TimeSettings.TIME_FORMATE;
  const minutes = minutesDuration % TimeSettings.MINUTE_IN_HOUR;

  const hoursFormated = String(hours).padStart(TimeSettings.TIME_VALUE_LENGTH, '0');
  const minutesFormated = String(minutes).padStart(TimeSettings.TIME_VALUE_LENGTH, '0');

  return `${hoursFormated}:${minutesFormated}`;
};
const getPeriodFromSliderStep = (step) => {
  const startPeriodMinutesDuration = getMinutesDurationFromTime(START_ORDER_TIME) + step * getMinutesDurationFromTime(SLIDER_STEP_DURATION);
  const endPeriodMinutesDuration = startPeriodMinutesDuration + getMinutesDurationFromTime(PERIOD_DURATION);

  return `${getTimeFromMinutesDuration(startPeriodMinutesDuration)} - ${getTimeFromMinutesDuration(endPeriodMinutesDuration)}`;
};
const setPeriodTimeSlider = (slider, period) => {
  const periodWrap = slider.querySelector('.range-slider-tooltip');

  periodWrap.textContent = period;
};
const setSliderThumbPosition = (slider, leftPosition, freeAreaSliderWidth) => {
  const sliderThumb = slider.querySelector('.js_range-slider-thumb');
  sliderThumb.style.left = `${leftPosition}px`;

  const step = Math.floor(leftPosition * NUMBER_SLIDER_STEPS / freeAreaSliderWidth);
  const currentStep = sliderThumb.dataset.step;

  if (!currentStep || String(step) !== currentStep) {
    sliderThumb.dataset.step = String(step);
    const period = getPeriodFromSliderStep(step);
    setPeriodTimeSlider(slider, period);
  }
};

const setRangeTimeSliderMove = (slider) => {
  const sliderThumb = slider.querySelector('.js_range-slider-thumb');

  const getLeftPositionThumb = (currentX, startClickX, startLeftPositionThumb, freeAreaSliderWidth) => {
    const leftPosition = currentX - startClickX + startLeftPositionThumb;

    if (leftPosition > freeAreaSliderWidth) {
      return freeAreaSliderWidth;
    } else if (leftPosition < 0) {
      return 0;
    }

    return Math.floor(leftPosition * NUMBER_SLIDER_STEPS / freeAreaSliderWidth + 0.5) * (freeAreaSliderWidth / NUMBER_SLIDER_STEPS);
  };

  sliderThumb.addEventListener('mousedown', (event) => {
    const startClientX = event.clientX;
    const startLeftPosition = sliderThumb.offsetLeft;
    const freeAreaSliderWidth = slider.getBoundingClientRect().width;


    const mouseMoveHandler = (moveEvent) => {
      const leftPosition = getLeftPositionThumb(moveEvent.clientX, startClientX, startLeftPosition, freeAreaSliderWidth);

      setSliderThumbPosition(slider, leftPosition, freeAreaSliderWidth);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', () => {
      setCursorStyle('auto');
      document.removeEventListener('mousemove', mouseMoveHandler);
    }, { once: true });

    setCursorStyle('pointer');
    preventSelection();
  });
  slider.addEventListener('dragstart', (event) => {
    event.preventDefault();
  });
};
const setRangeTimeSliderFocus = (slider) => {
  const sliderThumb = slider.querySelector('.js_range-slider-thumb');

  const getLeftPositionThumb = (startLeftPositionThumb, freeAreaSliderWidth, isRight = true) => {
    const sign = (isRight) ? +1 : -1;
    const leftPosition = startLeftPositionThumb + sign * (freeAreaSliderWidth / NUMBER_SLIDER_STEPS);

    if (leftPosition > freeAreaSliderWidth) {
      return freeAreaSliderWidth;
    } else if (leftPosition < 0) {
      return 0;
    }

    return leftPosition;
  };

  const keydownHandler = (event) => {
    if (!event.shiftKey || event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return;
    }

    const startLeftPosition = sliderThumb.offsetLeft;
    const freeAreaSliderWidth = slider.getBoundingClientRect().width;

    const leftPosition = getLeftPositionThumb(startLeftPosition, freeAreaSliderWidth, event.key === 'ArrowRight');

    setSliderThumbPosition(slider, leftPosition, freeAreaSliderWidth);
  };

  sliderThumb.addEventListener('focusin', () => {
    document.addEventListener('keydown', keydownHandler);
  });
  sliderThumb.addEventListener('focusout', () => {
    document.removeEventListener('keydown', keydownHandler);
  });
};

export {
  setRangeTimeSliderMove,
  setRangeTimeSliderFocus
};
