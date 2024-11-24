import "../styles/PlanCard.css";

export default function PlanCard({ plan, onOpenModal }) {
  return (
    <div className="plan-card">
      <p>Location: {plan.location}</p>
      <p>Plan Name: {plan.planName}</p>
      <p>Price: ${plan.price}</p>
      <div className="actions">
        <button
          className="approve-button"
          onClick={() => onOpenModal(plan)}
        >
          Approve
        </button>
        <button
          className="reject-button"
          onClick={() => onOpenModal(plan)}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
