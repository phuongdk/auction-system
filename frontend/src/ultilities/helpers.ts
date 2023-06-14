export const convertHoursToMilliseconds = (time: string) => {
  const temp = new Date(`2023-06-10 ${time}`)
  const hour = temp.getHours()
  const minute = temp.getMinutes()
  const second = temp.getSeconds()
  const milliseconds = (hour * 60 * 60 + minute * 60 + second) * 1000
  return milliseconds
}

export const convertMillisecondsToHours = (duration: number) => {
  let seconds: any = Math.floor((duration / 1000) % 60),
    minutes: any = Math.floor((duration / (1000 * 60)) % 60),
    hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? '0' + hours : hours
  minutes = (minutes < 10) ? '0' + minutes : minutes
  seconds = (seconds < 10) ? '0' + seconds : seconds

  return `${hours}:${minutes}:${seconds}`
}

export const capitalizeAndMatchLetters = (word: string) => {
  const [first, last] = word.split(' ')
  return `${first.charAt(0).toUpperCase()}${last.charAt(0).toUpperCase()}`
}

export const countdownTimer = (date: string, timePeriod: number) => {
  const dateExpires = new Date(date).getTime() + timePeriod;

  const now = new Date().getTime();
  const difference = dateExpires - now;

  if (difference < 0) {
    return '';
  }

  // Perform alculations for hours, minutes and seconds
  let hours: any = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes: any = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds: any = Math.floor((difference % (1000 * 60)) / 1000);

  hours = (hours < 10) ? '0' + hours : hours
  minutes = (minutes < 10) ? '0' + minutes : minutes
  seconds = (seconds < 10) ? '0' + seconds : seconds

  return `${hours}:${minutes}:${seconds}`
}