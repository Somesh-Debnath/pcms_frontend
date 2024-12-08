import "../styles/PlanCard.css";
import PropTypes from 'prop-types';

function PlanCard({ plan, onOpenModal }) {
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

PlanCard.propTypes = {
  plan: PropTypes.shape({
    location: PropTypes.string.isRequired,
    planName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default PlanCard;
