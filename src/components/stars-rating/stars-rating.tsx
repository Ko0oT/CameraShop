type StarsRatingProps = {
  rating: number;
}

const FullStarIcon = () => (
  <svg width={17} height={16} aria-hidden="true" data-testid="fullStarIcon">
    <use xlinkHref="#icon-full-star" />
  </svg>);

const EmptyStarIcon = () => (
  <svg width={17} height={16} aria-hidden="true" data-testid="emptyStarIcon">
    <use xlinkHref="#icon-star" />
  </svg>);

function StarsRating({rating}: StarsRatingProps) {
  return (
    <>
      {Array.from({length: rating}, (_, i) => i).map((it) => <FullStarIcon key={it}/>)}
      {Array.from({length: 5 - rating}, (_, i) => i).map((it) => <EmptyStarIcon key={it}/>)}
    </>
  );
}

export default StarsRating;
