export default function ProgressBar({ currentAmount, totalAmount }) {
    const percentage = !totalAmount ? 0 : (Number(currentAmount) / Number(totalAmount)) * 100;
    const displayPercentage = percentage.toFixed(2);
    
    return (
        <div className="progress">
        <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
        >
            {displayPercentage}%
        </div>
        </div>
    );
}